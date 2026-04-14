import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter, ResponseInterceptor } from './interceptors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = app.get(ConfigService);
  const port = parseInt(config.get('DB_PORT') ?? '3000', 10);

  // await app.listen(port);
  // console.log(`✅ API rodando em http://localhost:${port}`);
  await app.listen(port ?? 3000);
  console.log(`✅ portifolio-api rodando em http://localhost:${port}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
