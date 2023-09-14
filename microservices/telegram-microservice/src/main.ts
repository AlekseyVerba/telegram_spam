import { RedisServiceOptions } from './redis.options';
import { NestFactory } from '@nestjs/core';
import { RedisOptions } from '@nestjs/microservices';
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RedisOptions>(
    AppModule,
    new RedisServiceOptions(),
  );

  await app.listen();
}

bootstrap();
