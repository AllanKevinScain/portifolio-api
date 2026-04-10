import { PartialType } from '@nestjs/mapped-types';
import { CreateDifferentialDto } from './create-differential.dto';

export class UpdateDifferentialDto extends PartialType(CreateDifferentialDto) {}
