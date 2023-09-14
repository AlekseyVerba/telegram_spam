import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  ICreateTaskDatabase,
  IGetAllMyTasksDatabase,
  IGetTaskDatabase,
  IGetTaskDatabaseResponse,
  IGetAllMyTasksDatabaseResponse,
  IUpdateTaskDatabase,
  IGetAllActiveTasksDatabase
} from '../../../../../interfaces/microservices/database-microservice/modules/task.interface';
import { ITask } from '../../../../../interfaces/microservices/database-microservice/models/task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'database.task.create' })
  async createTask(dto: ICreateTaskDatabase): Promise<ITask> {
    return await this.taskService.createTask(dto);
  }

  @MessagePattern({ cmd: 'database.task.update' })
  async updateTask(dto: IUpdateTaskDatabase): Promise<ITask> {
    return await this.taskService.updateTask(dto);
  }

  @MessagePattern({ cmd: 'database.task.get-all-my' })
  async getAllMyTasks({
    uid,
  }: IGetAllMyTasksDatabase): Promise<IGetAllMyTasksDatabaseResponse> {
    return await this.taskService.getAllMyTasks(uid);
  }

  @MessagePattern({ cmd: 'database.task.get-one' })
  async getTask(dto: IGetTaskDatabase): Promise<IGetTaskDatabaseResponse> {
    return await this.taskService.getTask(dto);
  }

  @MessagePattern({ cmd: 'database.task.get-all-active' })
  async getAllActiveTasks(): Promise<IGetAllActiveTasksDatabase> {
    return await this.taskService.getAllActiveTasks()
  }
}
