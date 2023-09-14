import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUserExistByEmail } from 'src/validators/is-user-exist-by-email.validator';

export class LoginDTO {
  @IsEmail({}, { message: 'Поле должно быть почтой' })
  @IsUserExistByEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Пароль должен содержать минимум 8 символов' })
  @MaxLength(16, { message: 'Пароль не должен превышать 16 символов' })
  password: string;
}
