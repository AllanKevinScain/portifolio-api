import { IsString, IsUrl } from 'class-validator';

export class CreateDeveloperDto {
  @IsString()
  name: string;

  @IsString()
  linkedin: string;

  @IsUrl()
  image: string;
}
