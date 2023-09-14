import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { TaskService } from '../modules/task/task.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsTaskExistConstraint implements ValidatorConstraintInterface {
  constructor(@Inject(TaskService) private taskService: TaskService) {}

  async validate(id: number, _args: ValidationArguments) {
    const task = await this.taskService.getTask({ id });

    return !!task.task;
  }

  defaultMessage(args: ValidationArguments) {
    return `Пользователь с почтой '${args.value}' не существует`;
  }
}

export function IsTaskExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTaskExistConstraint,
    });
  };
}
