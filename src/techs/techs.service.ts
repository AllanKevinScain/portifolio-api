import { Injectable } from '@nestjs/common';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tech } from './entities/tech.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TechsService {
  constructor(
    @InjectRepository(Tech)
    private readonly repo: Repository<Tech>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateTechDto) {
    const tech = this.repo.create(data);
    return this.repo.save(tech);
  }

  async update(id: string, data: UpdateTechDto) {
    const tech = await this.findOne(id);
    if (!tech) return null;
    this.repo.merge(tech, data);
    return this.repo.save(tech);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    if (!data) return null;
    return this.repo.remove(data);
  }
}
