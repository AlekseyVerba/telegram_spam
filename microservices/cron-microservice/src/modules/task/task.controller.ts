import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskService } from './task.service';
import {
  ICreateTaskCron,
  IOffTaskCron,
  IUpdateTaskCron
} from '../../../../../interfaces/microservices/cron-microservice/modules/task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @MessagePattern({ cmd: 'cron.task.create' })
  async createTask({ id }: ICreateTaskCron) {
    return await this.taskService.createTask(id);
  }

  @MessagePattern({ cmd: 'cron.task.off' })
  async offTask({ id }: IOffTaskCron) {
    return await this.taskService.offTask(id);
  }

  @MessagePattern({ cmd: 'cron.task.update' })
  async updateTask({ id }: IUpdateTaskCron) {
    return await this.taskService.updateTask(id)
  }
}
