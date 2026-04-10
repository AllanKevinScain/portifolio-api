import { IsString } from 'class-validator';

export class CreateDifferentialDto {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  @IsString()
  title: string;

  @IsString()
  description: string;
}
