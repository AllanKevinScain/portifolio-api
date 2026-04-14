import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projetcs/projects.module';
import { DevelopersModule } from './developers/developers.module';
import { TechsModule } from './techs/techs.module';
import { WorksModule } from './works/works.module';
import { DifferentialModule } from './differential/differential.module';
import { HelloWorldModule } from './hello-world/hello-world.module';

// NEON CONSOLE
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    HelloWorldModule,
    DevelopersModule,
    ProjectsModule,
    TechsModule,
    WorksModule,
    DifferentialModule,
  ],
})
export class AppModule {}

// TypeOrmModule.forRootAsync({
//   inject: [ConfigService],
//   useFactory: (config: ConfigService) => ({
//     type: 'postgres',
//     host: config.get('DB_HOST'),
//     port: +config.get('DB_PORT'),
//     username: config.get('DB_USER'),
//     password: config.get('DB_PASS'),
//     database: config.get('DB_NAME'),
//     entities: [__dirname + '/**/*.entity.{ts,js}'],
//     synchronize: true,
//     ssl: { rejectUnauthorized: false },
//   }),
// }),
