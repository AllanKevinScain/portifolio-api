import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkEntity } from './entities/work.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkEntity)
    private readonly repo: Repository<WorkEntity>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateWorkDto) {
    const work = this.repo.create(data);
    return this.repo.save(work);
  }

  async update(id: string, data: UpdateWorkDto) {
    const work = await this.findOne(id);
    if (!work) return null;
    this.repo.merge(work, data);
    return this.repo.save(work);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    if (!data) return null;
    return this.repo.remove(data);
  }
}
