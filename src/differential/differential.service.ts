import { Injectable } from '@nestjs/common';
import { CreateDifferentialDto } from './dto/create-differential.dto';
import { UpdateDifferentialDto } from './dto/update-differential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Differential } from './entities/differential.entity';

@Injectable()
export class DifferentialService {
  constructor(
    @InjectRepository(Differential)
    private readonly repo: Repository<Differential>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateDifferentialDto) {
    const differential = this.repo.create(data);
    return this.repo.save(differential);
  }

  async update(id: string, data: UpdateDifferentialDto) {
    const differential = await this.findOne(id);
    if (!differential) return null;
    this.repo.merge(differential, data);
    return this.repo.save(differential);
  }

  async remove(id: string) {
    const differential = await this.findOne(id);
    if (!differential) return null;
    return this.repo.remove(differential);
  }
}
