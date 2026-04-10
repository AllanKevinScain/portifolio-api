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
import { TechsService } from './techs.service';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';

import { type Response } from 'express';

@Controller('techs')
export class TechsController {
  constructor(private readonly techsService: TechsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const projects = await this.techsService.findAll();

    if (projects.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const proeject = await this.techsService.findOne(id);

    if (!proeject) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return proeject;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTechDto: CreateTechDto) {
    return {
      message: 'Tecnologia criada com sucesso!',
      data: await this.techsService.create(createTechDto),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateTechDto) {
    const updated = await this.techsService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return {
      message: 'Tecnologia alterada com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.techsService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return;
  }
}
