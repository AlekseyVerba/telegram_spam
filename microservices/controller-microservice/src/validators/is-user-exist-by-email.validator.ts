import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from '../modules/user/user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserExistByEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(@Inject(UserService) private userService: UserService) {}

  async validate(email: string, _args: ValidationArguments) {
    return !!(await this.userService.findUserByEmail(email));
  }

  defaultMessage(args: ValidationArguments) {
    return `Пользователь с почтой '${args.value}' не существует`;
  }
}

export function IsUserExistByEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserExistByEmailConstraint,
    });
  };
}
