import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import {
  IFindUserByEmail,
  IFindUserByUid,
} from '../../../../../interfaces/microservices/database-microservice/modules/user-app.interface';
import { IUser } from '../../../../../interfaces/microservices/database-microservice/models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async findUserByEmail({ email }: IFindUserByEmail): Promise<IUser> {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findUserByUid({ uid }: IFindUserByUid): Promise<IUser> {
    return await this.userRepository.findByPk(uid);
  }
}
