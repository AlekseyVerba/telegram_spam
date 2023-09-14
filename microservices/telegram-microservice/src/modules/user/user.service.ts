import { Injectable } from '@nestjs/common';
import { TelegramClientService } from '../telegram-client/telegram-client.service';
import { IGetMyProfileTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly telegramClientService: TelegramClientService) {}

  async getMyProfile({ uid }: IGetMyProfileTelegram) {
    const client = await this.telegramClientService.getClient(uid);
    const user = await client.getMe();

    return user;
  }
}