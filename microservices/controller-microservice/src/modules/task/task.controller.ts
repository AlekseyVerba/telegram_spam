import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserProperty } from 'src/decorators/user-property.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { IGetAllMyTasksDatabaseResponse } from '../../../../../interfaces/microservices/database-microservice/modules/task.interface';
import { TaskIdParam } from './dto/task.param';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createTask(
    @Body() dto: CreateTaskDTO,
    @UserProperty('uid') uid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.user_uid = uid;

    return await this.taskService.createTask(dto, file);
  }

  @Get('all/my')
  async getAllMyTasks(
    @UserProperty('uid') uid: string,
  ): Promise<IGetAllMyTasksDatabaseResponse> {
    return await this.taskService.getAllMyTasks(uid);
  }

  @Put('update/:taskId')
  @UseInterceptors(FileInterceptor('file'))
  async updateTask(
    @Param() { taskId }: TaskIdParam,
    @Body() dto: UpdateTaskDTO,
    @UserProperty('uid') uid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    dto.user_uid = uid;
    dto.taskId = taskId;

    return await this.taskService.updateTask(dto, file);
  }

  @Get(':taskId')
  async getTask(
    @Param() { taskId }: TaskIdParam,
    @UserProperty('uid') uid: string,
  ) {
    return await this.taskService.getTask({ id: taskId, uid });
  }
}
