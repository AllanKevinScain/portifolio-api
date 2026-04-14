import { Module } from '@nestjs/common';
import { DifferentialService } from './differential.service';
import { DifferentialController } from './differential.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifferentialEntity } from './entities/differential.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DifferentialEntity])],
  controllers: [DifferentialController],
  providers: [DifferentialService],
})
export class DifferentialModule {}
