import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DifferentialService } from './differential.service';
import { CreateDifferentialDto } from './dto/create-differential.dto';
import { UpdateDifferentialDto } from './dto/update-differential.dto';

import { type Response } from 'express';
import { Protected } from 'src/common/decorators/protected.decorator';

@Controller('differential')
export class DifferentialController {
  constructor(private readonly differentialService: DifferentialService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const differential = await this.differentialService.findAll();

    if (differential.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(differential);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const differential = await this.differentialService.findOne(id);

    if (!differential) {
      throw new NotFoundException('Habilidade não encontrada!');
    }

    return differential;
  }

  @Post()
  @Protected()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDifferentialDto) {
    return {
      message: 'Habilidade criada com sucesso!',
      data: await this.differentialService.create(body),
    };
  }

  @Patch(':id')
  @Protected()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateDifferentialDto,
  ) {
    const updated = await this.differentialService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Habilidade não encontrada!');
    }

    return {
      message: 'Habilidade alterada com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @Protected()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.differentialService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Habilidade não encontrada!');
    }

    return;
  }
}
