import { IsString, IsUrl } from 'class-validator';

export class CreateWorkDto {
  constructor(title: string, description: string, image: string) {
    this.title = title;
    this.description = description;
    this.image = image;
  }

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  @IsUrl()
  image: string;
}
