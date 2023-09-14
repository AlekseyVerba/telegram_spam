import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function swaggerInit(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('Telegram app')
    .setVersion(process.env.npm_package_version || '1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, {
    swaggerOptions: {
      // https://stackoverflow.com/questions/64974561/nestjs-alphabetize-endpoints-in-swaggerui
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    // url: 'docs/swagger/swagger.json',
  });
}
