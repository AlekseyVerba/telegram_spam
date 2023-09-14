import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { UserService } from '../modules/user/user.service'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserNotExistByEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(@Inject(UserService) private userService: UserService) {}

  async validate(email: string, _args: ValidationArguments) {
    return !(await this.userService.findUserByEmail(email));
  }

  defaultMessage(args: ValidationArguments) {
    return `Пользователь с почтой '${args.value}' уже существует`;
  }
}

export function IsUserNotExistByEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNotExistByEmailConstraint,
    });
  };
}