import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { CreateDeveloperDto } from './dto/create-developer.dto';

import { type Response } from 'express';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const developers = await this.developersService.findAll();

    if (developers.length === 0) {
      return res.status(HttpStatus.NO_CONTENT).send();
    }

    return res.status(HttpStatus.OK).json(developers);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const developer = await this.developersService.findOne(id);

    if (!developer) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }

    return developer;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateDeveloperDto) {
    return {
      message: 'Desenvolvedor criado com sucesso!',
      data: await this.developersService.create(body),
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateDeveloperDto) {
    const updated = await this.developersService.update(id, body);

    if (!updated) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }

    return {
      message: 'Desenvolvedor alterado com sucesso!',
      data: updated,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const deleted = await this.developersService.remove(id);

    if (!deleted) {
      throw new NotFoundException('Desenvolvedor não encontrado');
    }

    return;
  }
}
