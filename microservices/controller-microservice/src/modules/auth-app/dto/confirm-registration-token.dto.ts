import { IsUUID } from 'class-validator';

export class ConfirmRegistrationTokenDTO {
  @IsUUID('4', { message: 'Токен не подходит' })
  token: string;
}
