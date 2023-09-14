import { RedisOptions, Transport } from '@nestjs/microservices';
import { IORedisOptions } from '@nestjs/microservices/external/redis.interface';

export class RedisServiceOptions implements RedisOptions {
  readonly transport = Transport.REDIS;
  options: {
    host?: string;
    port?: number;
    retryAttempts?: number;
    retryDelay?: number;
  } & IORedisOptions;

  constructor() {
    // if ('string' !== typeof process.env.REDIS_CONNECT) {
    //   throw new Error('Env REDIS_CONNECT was not set');
    // }

    this.options = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      username: 'default',
      password: process.env.REDIS_PASSWORD,
      retryAttempts: 100,
      retryDelay: 5000,
    };
  }
}
