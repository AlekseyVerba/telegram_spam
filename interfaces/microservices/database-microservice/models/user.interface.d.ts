import { IUserToken } from './user_token.interface'

export interface IUser {
    uid: string;
    email: string;
    password: string;
    is_active: boolean;
    tokens?: IUserToken[];
}

export type IUsetJWT = Pick<IUser, 'uid' | 'email'>