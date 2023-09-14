import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ITask } from '../../../../../interfaces/microservices/database-microservice/models/task.interface';
import {
  IGetTaskDatabase,
  IGetTaskDatabaseResponse,
  IGetAllActiveTasksDatabase,
} from '../../../../../interfaces/microservices/database-microservice/modules/task.interface';
import { CronJob } from 'cron';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class TaskService implements OnModuleInit {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @Inject('CRON_SERVICE') private microservice: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.delay(10000);

    const { tasks } = await this.getAllActiveTasks();

    tasks.forEach((task) => {
      this.startTelegramTask(task.cron, task.id);
    });
  }


  async createTask(id: number) {
    const newTask = await this.getTask(id);

    if (!newTask.task.is_active) {
      return false;
    }

    this.startTelegramTask(newTask.task.cron, id);
  }

  async updateTask(id: number) {
    this.offTask(id);
    this.createTask(id);
  }

  async offTask(id: number) {
    this.schedulerRegistry.deleteCronJob(String(id));
  }

  async getTask(id: number) {
    return await lastValueFrom<IGetTaskDatabaseResponse>(
      this.microservice.send<any, IGetTaskDatabase>(
        { cmd: 'database.task.get-one' },
        { id },
      ),
    );
  }

  async getAllActiveTasks() {
    return await lastValueFrom<IGetAllActiveTasksDatabase>(
      this.microservice.send<any, object>(
        { cmd: 'database.task.get-all-active' },
        {},
      ),
    );
  }

  async delay(ms: number) {
    return new Promise((res) => setTimeout(() => res(true), ms));
  }

  async startTelegramTask(cron: string, id: number) {
    const job = new CronJob(cron, async () => {
      const task = await this.getTask(id);

      this.microservice.emit<any, ITask>(
        { cmd: 'task.telegram.do' },
        task.task,
      );
    });

    this.schedulerRegistry.addCronJob(String(id), job);

    job.start();
  }
}
