import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

export const configureAppDocs = (app: NestExpressApplication) => {
  const options = new DocumentBuilder()
    .setTitle('NEST JS')
    .setVersion('1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access_token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-api', app, document);

  app.useStaticAssets(join(__dirname, '../docs/typedoc'), { prefix: '/wiki' });
};
