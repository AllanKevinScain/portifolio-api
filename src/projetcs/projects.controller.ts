import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { type Response } from 'express';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const projects = await this.projectsService.findAll();

    if (projects.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const proeject = await this.projectsService.findOne(id);

    if (!proeject) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return proeject;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return {
      message: 'Projeto criado com sucesso!',
      data: await this.projectsService.create(createProjectDto),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    const updated = await this.projectsService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return {
      message: 'Projeto alterado com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.projectsService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Projeto não encontrado');
    }

    return;
  }
}
