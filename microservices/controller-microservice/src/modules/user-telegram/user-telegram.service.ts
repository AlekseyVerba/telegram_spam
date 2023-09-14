import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IGetMyProfileTelegram } from '../../../../../interfaces/microservices/telegram-microservice/modules/user.interface';

@Injectable()
export class UserTelegramService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
  ) {}

  async getMyProfile(uid: string) {
    return await lastValueFrom(
      this.microservice.send<any, IGetMyProfileTelegram>(
        { cmd: 'telegram-user.get-my-profile' },
        { uid },
      ),
    );
  }
}
