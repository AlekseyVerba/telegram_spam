import { Inject, Injectable } from '@nestjs/common';
import { IUser } from '../../../../../interfaces/microservices/database-microservice/models/user.interface';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  IFindUserByEmail,
  IFindUserByUid,
} from '../../../../../interfaces/microservices/database-microservice/modules/user-app.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('CONTROLLER_SERVICE') private microservice: ClientProxy,
  ) {}

  async findUserByEmail(email: string): Promise<IUser | null> {
    const data: IFindUserByEmail = { email };

    return lastValueFrom<IUser | null>(
      this.microservice.send<any, IFindUserByEmail>(
        { cmd: 'user.find_by_email' },
        data,
      ),
    );
  }

  async findUserByUid(uid: string): Promise<IUser | null> {
    return lastValueFrom<IUser | null>(
      this.microservice.send<any, IFindUserByUid>(
        { cmd: 'user.find_by_uid' },
        { uid },
      ),
    );
  }
}
