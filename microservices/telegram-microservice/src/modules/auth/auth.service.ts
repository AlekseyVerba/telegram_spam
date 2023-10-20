import { Injectable } from '@nestjs/common';
import {
  ISendCode,
  ISignIn,
  ISendCodeResponse
} from '../../../../../interfaces/microservices/telegram-microservice/modules/auth.interface';
import { TelegramClientService } from '../telegram-client/telegram-client.service';
import { Api } from 'telegram';
import { API_HASH, API_ID } from '../../constants/api.constant';

@Injectable()
export class AuthService {

  constructor(private readonly telegramClientService: TelegramClientService) {}

  async sendCode({ phone_number, uid }: ISendCode) {
    const client = await this.telegramClientService.getClient(uid);
    const result = await client.invoke(
      new Api.auth.SendCode({
        phoneNumber: phone_number,
        apiId: API_ID,
        apiHash: API_HASH,
        settings: new Api.CodeSettings({}),
      }),
    );

    return result;
  }

  async signIn({ phone_code, phone_code_hash, phone_number, uid }: ISignIn) {
    try {
      const client = await this.telegramClientService.getClient(uid);

      console.log('sign in')
      const result = await client.invoke(
        new Api.auth.SignIn({
          phoneNumber: phone_number,
          phoneCodeHash: phone_code_hash,
          phoneCode: phone_code,
        }),
      );

      console.log(result)
      client.session.save();

      return result;
    } catch (error) {
      console.log(error)
    }
    // return result;
  }

  // async getMyUser() {
  //   const client = await this.telegramClientService.getClient(
  //     join(this.nameDir, uid),
  //   );

  //   await client.sendMessage('me', { message: 'Hello 2!' });
  // }

  // async getPassword() {
  //   const client = await this.telegramClientService.getClient(
  //     join(this.nameDir, uid),
  //   );

  //   const result = await client.invoke(new Api.account.GetPassword());

  //   return result;
  // }
}
