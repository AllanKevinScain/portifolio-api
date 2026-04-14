import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkEntity } from './entities/work.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkEntity])],
  controllers: [WorkController],
  providers: [WorkService],
})
export class WorkModule {}
