import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UserToken } from 'src/models/user_token.model';
import { TokenTypesEnum } from '../../../../../interfaces/microservices/database-microservice/models/user_token.interface';
import {
  IRegistrationResponse,
  IConfirmRegistrationToken,
  IConfirmRegistrationTokenResponse,
  IRegistration,
  ILogin,
  ILoginResponse,
} from '../../../../../interfaces/microservices/database-microservice/modules/auth-app.interface';
import {
  IRegistrationMailer,
  IConfirmRegistrationSuccessMailer,
} from '../../../../../interfaces/microservices/mailer-microservice/modules/auth.interface';
import { ClientProxy } from '@nestjs/microservices';
import { sign } from 'jsonwebtoken';
import { IUsetJWT } from '../../../../../interfaces/microservices/database-microservice/models/user.interface';
import { compare } from 'bcrypt';

@Injectable()
export class AuthAppService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,

    @InjectModel(UserToken)
    private userTokenRepository: typeof UserToken,

    @Inject('DATABASE_SERVICE') private microservice: ClientProxy,
  ) {}

  async registration({
    email,
    password,
  }: IRegistration): Promise<IRegistrationResponse> {
    const transaction = await this.userRepository.sequelize.transaction();

    try {
      const newUser = await this.userRepository.create(
        { email, password },
        { transaction },
      );

      const { value } = await this.userTokenRepository.create(
        {
          type: TokenTypesEnum.REGISTRATION,
          user_uid: newUser.uid,
        },
        { transaction },
      );

      this.microservice.emit<any, IRegistrationMailer>(
        { cmd: 'mailer.registration' },
        { email, token: value },
      );

      await transaction.commit();

      return {
        message:
          'На вашу почту отправлено сообщение. Пожалуйста, перейдите по ссылке',
      };
    } catch (err) {
      transaction.rollback();
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async confirmRegistrationToken({
    token,
  }: IConfirmRegistrationToken): Promise<IConfirmRegistrationTokenResponse> {
    const transaction = await this.userRepository.sequelize.transaction();

    try {
      const currentToken = await this.userTokenRepository.findByPk(token);

      if (!currentToken) {
        throw new HttpException('Токен не существует', HttpStatus.NOT_FOUND);
      }

      if (!currentToken.is_active) {
        throw new HttpException('Токен не активен', HttpStatus.CONFLICT);
      }

      if (new Date(currentToken.expire) < new Date()) {
        throw new HttpException(
          'У токена закончился срок действия',
          HttpStatus.BAD_GATEWAY,
        );
      }

      currentToken.update({ is_active: false }, { transaction });

      const user = await (
        await this.userRepository.findOne({
          include: [
            {
              model: UserToken,
              attributes: [],
              where: {
                value: token,
              },
              required: true,
            },
          ],
        })
      ).update({ is_active: true }, { transaction });

      delete user.tokens;

      const jwt_token = this.createJwtToken(user);

      this.microservice.emit<any, IConfirmRegistrationSuccessMailer>(
        { cmd: 'mailer.confirm-registration-success' },
        {
          email: user.email,
        },
      );

      await transaction.commit();

      return {
        user,
        jwt_token,
      };
    } catch (err) {
      transaction.rollback();
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async login({ email, password }: ILogin): Promise<ILoginResponse> {
    let user = await this.userRepository
      .scope({ password })
      .findOne({ where: { email } });

    const isPasswordEqual = await compare(password, user.password);

    if (!isPasswordEqual) {
      throw new HttpException('Неверные данные', HttpStatus.FORBIDDEN);
    }

    if (!user.is_active) {
      throw new HttpException('Ваш аккаунт не активен', HttpStatus.FORBIDDEN);
    }

    const jwt_token = this.createJwtToken(user);

    user = user.toJSON();
    delete user.password;

    return {
      user,
      jwt_token,
    };
  }

  private createJwtToken(user: User): string {
    const userJWT: IUsetJWT = { email: user.email, uid: user.uid };

    return sign(userJWT, process.env.JWT_SECRET || '1111', {
      expiresIn: '3h',
    });
  }
}
