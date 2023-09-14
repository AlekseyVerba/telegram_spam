import { IUser } from '../models/user.interface'

export interface IRegistration {
    email: string
    password: string
}

export interface IRegistrationResponse {
    message: string
}

export interface IConfirmRegistrationToken {
    token: string
}

export interface IConfirmRegistrationTokenResponse {
    user: IUser,
    jwt_token: string,
}

export interface ILogin {
    email: string;
    password: string
}

export interface ILoginResponse {
    user: IUser
    jwt_token: string
}