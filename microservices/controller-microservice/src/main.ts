import { RedisServiceOptions } from './redis.options';
import {
  ShutdownSignal,
  ValidationPipe,
  HttpException,
  HttpStatus,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { MicroserviceOptions } from '@nestjs/microservices';
import compression from 'compression';
import { swaggerInit } from './swagger-init';

const HTTP_PORT = Number(process.env.HTTP_PORT) || 3010;

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
    // { cors: true },
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const limit = '25mb';
  app.use(json({ limit }));
  app.use(urlencoded({ extended: true, limit }));

  app.use(compression());

  // app.use(
  //   cors({
  //     origin: true,
  //     credentials: true,
  //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  //     allowedHeaders: ['Content-Type', 'X-Auth-Token', '*'],
  //   }),
  // );

  // const corsOptions: cors.CorsOptions = {
  //     origin: [
  //         process.env.ACCESS_URL
  //     ],
  //     credentials: true,
  // };
  // app.use(cors(corsOptions));

  // https://docs.nestjs.com/faq/global-prefix
  app.setGlobalPrefix('api');

  // https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // app.useGlobalInterceptors(new UpdateSessionInterceptor());

  // app.useGlobalFilters(new AllErrorExceptionFilter(configService));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: false,
      skipNullProperties: false,
      // If set to true, attempts to validate unknown objects fail immediately
      // CVE-2019-18413
      // forbidUnknownValues: true,
      //
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      // exceptionFactory: (errors: ValidationError[]) => {
      //   if (errors[0].target instanceof ParamIDRequestDTO) {
      //     throw new AppNotFoundException('Resource not found');
      //   }
      //   const reformedErrors = parseValidation(errors);

      //   throw new AppBadRequestException('Validation', reformedErrors);
      // },
      exceptionFactory: (errors) =>
        new HttpException(errors, HttpStatus.BAD_REQUEST),
    }),
  );

  swaggerInit(app);

  app.enableShutdownHooks([ShutdownSignal.SIGTERM, ShutdownSignal.SIGINT]);

  //const microservice =
  app.connectMicroservice<MicroserviceOptions>(new RedisServiceOptions());

  await app.startAllMicroservices();

  await app.listen(HTTP_PORT);
}

bootstrap();
