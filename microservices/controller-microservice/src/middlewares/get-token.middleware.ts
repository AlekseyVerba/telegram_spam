import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IUsetJWT } from '../../../../interfaces/microservices/database-microservice/models/user.interface';

@Injectable()
export class GetUser implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next();
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      next();
      return;
    }

    try {
      const user = verify(token, process.env.JWT_SECRET || '1111');

      req.user = user as IUsetJWT;
    } catch (e) {
      console.log(e);
    }

    next();
  }
}
