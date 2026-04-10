import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  NotFoundException,
  Controller,
} from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

import { type Response } from 'express';

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const works = await this.worksService.findAll();

    if (works.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(works);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const work = await this.worksService.findOne(id);

    if (!work) {
      throw new NotFoundException('Trabalho ou evento não encontrado!');
    }

    return work;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createWorkDto: CreateWorkDto) {
    return {
      message: 'Trabalho ou evento criado com sucesso!',
      data: await this.worksService.create(createWorkDto),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateWorkDto) {
    const updated = await this.worksService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Trabalho ou evento não encontrado!');
    }

    return {
      message: 'Trabalho ou evento alterado com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.worksService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Trabalho não encontrado!');
    }

    return;
  }
}
