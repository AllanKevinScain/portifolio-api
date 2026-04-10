import { IsString, IsIn } from 'class-validator';
import { type NivelType } from '../entities/tech.entity';

export class CreateTechDto {
  constructor(name: string, description: string, nivel: NivelType) {
    this.name = name;
    this.description = description;
    this.nivel = nivel;
  }

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsIn(['junior', 'mid', 'senior', 'stack'])
  nivel: NivelType;
}
