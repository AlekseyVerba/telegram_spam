import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { ISendCode, ISignIn } from '../../../../../interfaces/microservices/telegram-microservice/modules/auth.interface';

@Controller('telegram-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'telegram-auth.send-code' })
  async sendCode(dto: ISendCode) {
    return await this.authService.sendCode(dto);
  }

  @MessagePattern({ cmd: 'telegram-auth.sign-in' })
  async signIn(dto: ISignIn) {
    return await this.authService.signIn(dto);
  }
}
