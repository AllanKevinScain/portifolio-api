import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  constructor(
    title: string,
    description: string,
    repository: string,
    demo: string,
  ) {
    this.title = title;
    this.description = description;
    this.repository = repository;
    this.demo = demo;
  }

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsUrl()
  repository: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  demo?: string;
}
