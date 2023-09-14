import Express from 'express';
import { IUsetJWT } from '../../../../../interfaces/microservices/database-microservice/models/user.interface'

declare global {
  namespace Express {
    interface Request {
      user?: IUsetJWT;
    }
  }
}