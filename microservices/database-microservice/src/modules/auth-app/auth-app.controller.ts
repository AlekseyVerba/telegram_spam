import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthAppService } from './auth-app.service';
import {
  IRegistration,
  IRegistrationResponse,
  IConfirmRegistrationToken,
  IConfirmRegistrationTokenResponse,
  ILogin,
  ILoginResponse
} from '../../../../../interfaces/microservices/database-microservice/modules/auth-app.interface';

@Controller('auth-app')
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @MessagePattern({ cmd: 'auth-app.registration' })
  async registration(dto: IRegistration): Promise<IRegistrationResponse> {
    return await this.authAppService.registration(dto);
  }

  @MessagePattern({ cmd: 'auth-app.confirm-registration-token' })
  async confirmRegistrationToken(
    dto: IConfirmRegistrationToken,
  ): Promise<IConfirmRegistrationTokenResponse> {
    return await this.authAppService.confirmRegistrationToken(dto);
  }

  @MessagePattern({ cmd: 'auth-app.login' })
  async login(dto: ILogin): Promise<ILoginResponse> {
    return await this.authAppService.login(dto)
  }
}
