import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { ResponseInterceptor } from './response';
import { Reflector } from '@nestjs/core';

export const configureAppMiddleware = (
  app: NestExpressApplication,
  configService: ConfigService,
): void => {
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      disableErrorMessages: configService.get('DETAILED_ERRORS') === 'true',
    }),
  );

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.enableCors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] });

  app.use(helmet());
  // app.use(compression());
  app.use(bodyParser.json({ limit: '50mb' }));

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
};
