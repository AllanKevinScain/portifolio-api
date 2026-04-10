import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateProjectDto) {
    const project = this.repo.create(data);
    return this.repo.save(project);
  }

  async update(id: string, data: UpdateProjectDto) {
    const project = await this.findOne(id);
    if (!project) return null;
    this.repo.merge(project, data);
    return this.repo.save(project);
  }

  async remove(id: string) {
    const data = await this.findOne(id);
    if (!data) return null;
    return this.repo.remove(data);
  }
}
