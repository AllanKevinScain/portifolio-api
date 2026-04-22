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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT') ?? 5432),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [`${__dirname}/**/*.entity{.js,.ts}`],
        migrations: [`${__dirname}/migration/{.ts,*.js}`],
        migrationsRun: true,
        ssl:
          config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
      }),
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
