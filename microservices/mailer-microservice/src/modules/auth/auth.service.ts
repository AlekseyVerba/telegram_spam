import { Injectable } from '@nestjs/common';

//MODULES
import { MailerService } from '@nestjs-modules/mailer';
import {
  IRegistrationMailer,
  IConfirmRegistrationSuccessMailer,
} from '../../../../../interfaces/microservices/mailer-microservice/modules/auth.interface';
import { registrationTemplate } from './temapltes/registration.template';
import { confirmRegistrationSuccessTemplate } from './temapltes/confirm-registration-success.template';

@Injectable()
export class AuthService {
  constructor(private mailerService: MailerService) {}

  registration({ email, token }: IRegistrationMailer) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Registration on tg',
      html: registrationTemplate(token),
    });
  }

  confirmRegistrationSuccess({ email }: IConfirmRegistrationSuccessMailer) {
    this.mailerService.sendMail({
      to: email,
      subject: 'Confirm registration success',
      html: confirmRegistrationSuccessTemplate(email),
    });
  }

  //   resetPassword({ email, ...dto }: UserWithTokenDto) {
  //     this.mailerService.sendMail({
  //       to: email,
  //       subject: 'Reset password on Ai-vision',
  //       html: resetPasswordTemplate(dto),
  //     });
  //   }
}
