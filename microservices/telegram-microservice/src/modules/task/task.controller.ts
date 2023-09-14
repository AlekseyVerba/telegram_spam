import { Controller } from '@nestjs/common';
import { TaskService } from './task.service';
import { EventPattern } from '@nestjs/microservices';
import { ITask } from '../../../../../interfaces/microservices/database-microservice/models/task.interface';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @EventPattern({ cmd: 'task.telegram.do' })
  doTask(dto: ITask) {
    this.taskService.doTask(dto);
  }
}
