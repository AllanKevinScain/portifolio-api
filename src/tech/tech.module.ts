import { Module } from '@nestjs/common';
import { TechService } from './tech.service';
import { TechController } from './tech.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechEntity } from './entities/tech.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TechEntity])],
  controllers: [TechController],
  providers: [TechService],
})
export class TechModule {}
