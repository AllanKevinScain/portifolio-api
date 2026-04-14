import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { ProjectModule } from './project/project.module';
import { TechModule } from './tech/tech.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USER,
      port: Number(process.env.DB_PORT ?? 5432),
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
    }),
    HelloWorldModule,
    ProjectModule,
    TechModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
