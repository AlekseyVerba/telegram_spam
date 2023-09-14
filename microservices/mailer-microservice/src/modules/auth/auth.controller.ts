import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  IRegistrationMailer,
  IConfirmRegistrationSuccessMailer,
} from '../../../../../interfaces/microservices/mailer-microservice/modules/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern({ cmd: 'mailer.registration' })
  registration(dto: IRegistrationMailer): void {
    this.authService.registration(dto);
  }

  //   @EventPattern('message.reset-password')
  //   resetPassword(dto: UserWithTokenDto) {
  //     this.authService.resetPassword(dto);
  //   }

  @EventPattern({ cmd: 'mailer.confirm-registration-success' })
  confirmRegistrationSuccess(dto: IConfirmRegistrationSuccessMailer): void {
    this.authService.confirmRegistrationSuccess(dto);
  }
}
