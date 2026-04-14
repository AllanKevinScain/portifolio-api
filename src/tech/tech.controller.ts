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
import { TechService } from './tech.service';
import { CreateTechDto } from './dto/create-tech.dto';
import { UpdateTechDto } from './dto/update-tech.dto';

import { type Response } from 'express';
import { Protected } from 'src/common/decorators/protected.decorator';

@Controller('tech')
export class TechController {
  constructor(private readonly techService: TechService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const projects = await this.techService.findAll();

    if (projects.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(projects);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const proeject = await this.techService.findOne(id);

    if (!proeject) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return proeject;
  }

  @Post()
  @Protected()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTechDto: CreateTechDto) {
    return {
      message: 'Tecnologia criada com sucesso!',
      data: await this.techService.create(createTechDto),
    };
  }

  @Patch(':id')
  @Protected()
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTechDto,
  ) {
    const updated = await this.techService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return {
      message: 'Tecnologia alterada com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @Protected()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.techService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Tecnologia não encontrada!');
    }

    return;
  }
}
