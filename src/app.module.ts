import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { ProjectModule } from './project/project.module';
import { TechModule } from './tech/tech.module';
import { DifferentialModule } from './differential/differential.module';
import { WorkModule } from './work/work.module';

// providers
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './common/guard/api-key.guard';
import databaseConfig, { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development.local'],
      load: [databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get('database') as DatabaseConfig;

        return {
          ...db,
          entities: [`${__dirname}/**/*.entity.js`],
          migrations: [`${__dirname}/migration/*.js`],
          migrationsRun: true,
          logging: true,
        };
      },
    }),

    HelloWorldModule,
    ProjectModule,
    TechModule,
    DifferentialModule,
    WorkModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
  ],
})

// aplicação dos middlewares
export class AppModule {}
