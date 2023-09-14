import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  ICreateTaskDatabase,
  IGetAllMyTasksDatabaseResponse,
  IGetTaskDatabaseResponse,
  IGetTaskDatabase,
  IUpdateTaskDatabase,
  IGetAllActiveTasksDatabase,
} from '../../../../../interfaces/microservices/database-microservice/modules/task.interface';
import {
  ICreateTaskCron,
  IOffTaskCron,
  IUpdateTaskCron,
} from '../../../../../interfaces/microservices/cron-microservice/modules/task.interface';
import { ITask } from '../../../../../interfaces/microservices/database-microservice/models/task.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../../models/task.model';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,

    @Inject('DATABASE_SERVICE') private microservice: ClientProxy,
  ) {}

  async createTask({ is_active = true, ...dto }: ICreateTaskDatabase) {
    const task = await this.taskRepository.create({ ...dto, is_active });

    this.onCronTask(task.id);

    return task;
  }

  async updateTask({
    chats,
    taskId,
    user_uid,
    ...dto
  }: IUpdateTaskDatabase): Promise<ITask> {
    const task = (await this.getTask({ id: taskId, uid: user_uid })).task;

    const actualChats = chats || task.chats;

    await this.taskRepository.update(
      { ...dto, chats: actualChats },
      {
        where: {
          id: taskId,
        },
      },
    );

    if (dto.cron && dto.cron !== task.cron) {
      this.updateCronTask(task.id);
    }

    if (dto.is_active !== undefined && dto.is_active !== task.is_active) {
      dto.is_active ? this.onCronTask(task.id) : this.offCronTask(task.id);
    }

    return (await this.getTask({ id: task.id })).task;
  }

  updateCronTask(id: number) {
    this.microservice.emit<any, IUpdateTaskCron>(
      { cmd: 'cron.task.update' },
      { id },
    );
  }

  onCronTask(id: number) {
    this.microservice.emit<any, ICreateTaskCron>(
      { cmd: 'cron.task.create' },
      { id },
    );
  }

  offCronTask(id: number) {
    this.microservice.emit<any, IOffTaskCron>({ cmd: 'cron.task.off' }, { id });
  }

  async getAllMyTasks(uid: string): Promise<IGetAllMyTasksDatabaseResponse> {
    const result = await this.taskRepository.findAll({
      where: {
        user_uid: uid,
      },
    });

    return {
      tasks: result,
    };
  }

  async getTask({
    id,
    uid,
  }: IGetTaskDatabase): Promise<IGetTaskDatabaseResponse> {
    const result: Task = await this.taskRepository.findByPk(id);

    if (uid && result.user_uid !== uid) {
      throw new HttpException(
        'Нету доступа к данной задаче',
        HttpStatus.FORBIDDEN,
      );
    }

    return {
      task: result,
    };
  }

  async getAllActiveTasks(): Promise<IGetAllActiveTasksDatabase> {
    const tasks = await this.taskRepository.findAll({
      where: {
        is_active: true,
      },
      attributes: ['id', 'cron'],
    });

    return {
      tasks,
    } as any;
  }
}
