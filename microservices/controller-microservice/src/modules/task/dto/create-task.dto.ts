import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  name: string;

  @IsString()
  message: string;

  @IsString()
  cron: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsString({ each: true })
  chats: string[];

  @IsEmpty()
  user_uid: string;

  @IsEmpty()
  file: string;
}
