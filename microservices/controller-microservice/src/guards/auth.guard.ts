import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(UserService) private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();

    if (!req.user) {
      return false;
    }

    const user = await this.userService.findUserByUid(req.user.uid);

    if (!user.is_active) {
      return false;
    }

    return true;
  }
}
