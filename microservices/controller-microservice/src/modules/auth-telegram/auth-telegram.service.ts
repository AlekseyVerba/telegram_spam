import { Inject, Injectable } from '@nestjs/common';
import { SendCodeDTO } from './dto/send-code.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  ISendCode,
  ISendCodeResponse,
  ISignIn
} from '../../../../../interfaces/microservices/telegram-microservice/modules/auth.interface';

@Injectable()
export class AuthTelegramService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
  ) {}

  async sendCode(dto: SendCodeDTO) {
    return await lastValueFrom<ISendCodeResponse>(
      this.microservice.send<any, ISendCode>(
        { cmd: 'telegram-auth.send-code' },
        dto,
      ),
    );
  }

  async signIn(dto: SignInDTO) {
    return await lastValueFrom<ISendCodeResponse>(
      this.microservice.send<any, ISignIn>(
        { cmd: 'telegram-auth.sign-in' },
        dto,
      ),
    );
  }

  // async getMyUser() {

  // }
}
