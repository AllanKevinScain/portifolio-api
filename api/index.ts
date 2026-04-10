import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, ResponseInterceptor } from '../src/interceptors';

import serverlessExpress from '@vendia/serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Request, Response } from 'express';

const expressApp = express();

type ServerlessHandler = (req: Request, res: Response) => Promise<void>;

let cachedServer: ServerlessHandler;

async function bootstrap(): Promise<ServerlessHandler> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    { cors: true },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.init();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return serverlessExpress({ app: expressApp }) as ServerlessHandler;
}

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }

  return cachedServer(req, res);
}
