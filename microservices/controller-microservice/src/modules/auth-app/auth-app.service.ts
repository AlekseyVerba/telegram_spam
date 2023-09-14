import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  IRegistration,
  IRegistrationResponse,
  IConfirmRegistrationToken,
  IConfirmRegistrationTokenResponse,
  ILogin,
  ILoginResponse,
} from '../../../../../interfaces/microservices/database-microservice/modules/auth-app.interface';
import { RegistrationDTO } from './dto/registration.dto';
import { ConfirmRegistrationTokenDTO } from './dto/confirm-registration-token.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthAppService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
  ) {}

  async registration(dto: RegistrationDTO): Promise<IRegistrationResponse> {
    return await lastValueFrom<IRegistrationResponse>(
      this.microservice.send<any, IRegistration>(
        { cmd: 'auth-app.registration' },
        dto,
      ),
    );
  }

  async confirmRegistrationToken(
    dto: ConfirmRegistrationTokenDTO,
  ): Promise<IConfirmRegistrationTokenResponse> {
    return await lastValueFrom<IConfirmRegistrationTokenResponse>(
      this.microservice.send<any, IConfirmRegistrationToken>(
        { cmd: 'auth-app.confirm-registration-token' },
        dto,
      ),
    );
  }

  async login(dto: LoginDTO): Promise<ILoginResponse> {
    return await lastValueFrom<ILoginResponse>(
      this.microservice.send<any, ILogin>({ cmd: 'auth-app.login' }, dto),
    );
  }

  async checkAuth() {}
}
