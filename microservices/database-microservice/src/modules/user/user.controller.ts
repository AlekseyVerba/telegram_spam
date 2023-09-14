import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  IFindUserByEmail,
  IFindUserByUid,
} from '../../../../../interfaces/microservices/database-microservice/modules/user-app.interface';
import { IUser } from '../../../../../interfaces/microservices/database-microservice/models/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.find_by_email' })
  async findUserByEmail(dto: IFindUserByEmail) {
    return await this.userService.findUserByEmail(dto);
  }

  @MessagePattern({ cmd: 'user.find_by_uid' })
  async findUserByUid(dto: IFindUserByUid): Promise<IUser> {
    return await this.userService.findUserByUid(dto);
  }
}
