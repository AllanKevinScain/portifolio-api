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
import { WorkService } from './work.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateWorkDto } from './dto/update-work.dto';

import { type Response } from 'express';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const works = await this.workService.findAll();

    if (works.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(works);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const work = await this.workService.findOne(id);

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
      data: await this.workService.create(createWorkDto),
    };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateWorkDto,
  ) {
    const updated = await this.workService.update(id, body);

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
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.workService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Trabalho não encontrado!');
    }

    return;
  }
}
