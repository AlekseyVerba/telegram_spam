import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsUserNotExistByEmail } from 'src/validators/is-user-not-exist-by-email.validator';

export class RegistrationDTO {
  @IsUserNotExistByEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @MaxLength(16, { message: 'Пароль не должен превышать 16 символов' })
  password: string;
}
