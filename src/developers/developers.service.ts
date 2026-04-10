import { Injectable } from '@nestjs/common';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Repository } from 'typeorm';
import { Developer } from './entities/developer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@Injectable()
export class DevelopersService {
  constructor(
    @InjectRepository(Developer)
    private readonly repo: Repository<Developer>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateDeveloperDto) {
    const developer = this.repo.create(data);
    return this.repo.save(developer);
  }

  async update(id: string, data: UpdateDeveloperDto) {
    const developer = await this.findOne(id);
    if (!developer) return null;
    this.repo.merge(developer, data);
    return this.repo.save(developer);
  }

  async remove(id: string) {
    const developer = await this.findOne(id);
    if (!developer) return null;
    return this.repo.remove(developer);
  }
}
