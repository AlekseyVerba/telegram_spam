import { IUser } from './user.interface'

export enum TokenTypesEnum {
    REGISTRATION = 'registration',
    RESET_PASSWORD = 'reset-password',
}

export interface IUserToken {
      value: string;
      expire: string;
      is_active: boolean;
      type: TokenTypesEnum;
      user_uid: string;
      user?: IUser;
}