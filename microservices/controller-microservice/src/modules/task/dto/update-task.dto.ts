import { IsBoolean, IsDate, IsEmpty, IsOptional, IsString } from 'class-validator';
import { ITask } from '../../../../../../interfaces/microservices/database-microservice/models/task.interface';

export class UpdateTaskDTO implements Partial<ITask> {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  cron?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsString({ each: true })
  @IsOptional()
  chats?: string[];

  @IsString()
  @IsOptional()
  file?: string;

  @IsEmpty()
  user_uid: string;

  @IsEmpty()
  taskId: number;
}
