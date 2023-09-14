import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUsetJWT } from '../../../../interfaces/microservices/database-microservice/models/user.interface'

export const UserProperty = createParamDecorator(
  (property: keyof IUsetJWT, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const returnData =
      request.user && request.user[property]
        ? request.user[property]
        : undefined;
    return returnData;
  }
);