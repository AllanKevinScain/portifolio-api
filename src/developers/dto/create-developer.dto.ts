import { IsString, IsUrl } from 'class-validator';

export class CreateDeveloperDto {
  constructor(name: string, linkedin: string, image: string) {
    this.name = name;
    this.linkedin = linkedin;
    this.image = image;
  }

  @IsString()
  name: string;

  @IsString()
  linkedin: string;

  @IsString()
  @IsUrl()
  image: string;
}
