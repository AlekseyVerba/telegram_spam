import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { IGetMyProfileTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/user.interface';

@Controller('telegram-user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'telegram-user.get-my-profile' })
  async getMyProfile(dto: IGetMyProfileTelegram) {
    return await this.userService.getMyProfile(dto);
  }
}
