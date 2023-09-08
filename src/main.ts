import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { configureAppMiddleware } from './configure-middleware';
import { configureAppDocs } from './configure-app-docs';
import { Server as SocketIOServer } from 'socket.io';
import {createServer} from "http";
import { Container } from 'typedi';
import { SocketService } from "./modules/message/socket.service"
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  configureAppMiddleware(app, app.get(ConfigService));
  configureAppDocs(app);
  const server = createServer();
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
    },
  });
  io.listen(3004);
  io.on("connection", (socket) => {
    console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  });
  Container.set('socketSever', io);
  const socketService = Container.get(SocketService);
  Container.set('socketService', socketService);
  const serverRDS = await app.listen(3000);
  app.get(Logger).log(`Server is running at http://localhost:${configService.get('PORT')} 🚀`, 'NestApplication');
  serverRDS.setTimeout(600000); // 10 minutes
}
bootstrap();
