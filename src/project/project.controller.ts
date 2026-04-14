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
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

import { type Response } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const projects = await this.projectService.findAll();

    if (projects.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const proeject = await this.projectService.findOne(id);

    if (!proeject) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    return proeject;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: CreateProjectDto) {
    return {
      message: 'Projeto criado com sucesso!',
      data: await this.projectService.create(createProjectDto),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    const updated = await this.projectService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    return {
      message: 'Projeto alterado com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.projectService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Projeto não encontrado!');
    }

    return;
  }
}
