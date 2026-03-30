import { Module } from '@nestjs/common';
import { DevelopersModule } from './developers/developers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './developers/app.controller';

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
    DevelopersModule,
  ],
  controllers: [AppController],
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
