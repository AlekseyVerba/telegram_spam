import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { FileService } from '../file/file.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTaskDTO } from './dto/create-task.dto';
import { lastValueFrom } from 'rxjs';
import {
  IUpdateTaskDatabase,
  ICreateTaskDatabase,
  IGetAllMyTasksDatabaseResponse,
  IGetAllMyTasksDatabase,
  IGetTaskDatabaseResponse,
  IGetTaskDatabase,
} from '../../../../../interfaces/microservices/database-microservice/modules/task.interface';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
    private readonly fileService: FileService,
  ) {}

  async createTask(dto: CreateTaskDTO, file: Express.Multer.File) {

    if (file) {
      dto.file = this.fileService.createFile(file).fullPath;
    }

    return await lastValueFrom(
      this.microservice.send<any, ICreateTaskDatabase>(
        { cmd: 'database.task.create' },
        dto,
      ),
    );
  }

  async updateTask(dto: UpdateTaskDTO, file: Express.Multer.File) {
    const { task } = await this.getTask({ id: dto.taskId, uid: dto.user_uid });

    if (task.user_uid !== dto.user_uid) {
      throw new HttpException(
        'Нету доступа к данной задаче',
        HttpStatus.FORBIDDEN,
      );
    }

    if (file) {
      if (task.file) {
        this.fileService.deleteFile(task.file);
      }

      dto.file = this.fileService.createFile(file).fullPath;
    }

    return await lastValueFrom(
      this.microservice.send<any, IUpdateTaskDatabase>(
        { cmd: 'database.task.update' },
        dto,
      ),
    );
  }

  async getAllMyTasks(uid: string): Promise<IGetAllMyTasksDatabaseResponse> {
    return await lastValueFrom<IGetAllMyTasksDatabaseResponse>(
      this.microservice.send<any, IGetAllMyTasksDatabase>(
        { cmd: 'database.task.get-all-my' },
        { uid },
      ),
    );
  }

  async getTask(dto: IGetTaskDatabase): Promise<IGetTaskDatabaseResponse> {
    return await lastValueFrom<IGetTaskDatabaseResponse>(
      this.microservice.send<any, IGetTaskDatabase>(
        { cmd: 'database.task.get-one' },
        dto,
      ),
    );
  }
}
