import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

export type NivelType = 'junior' | 'mid' | 'senior' | 'stack';

@Entity({ name: 'techs' })
export class Tech extends BasePortifolioEntity {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    description: string,
    nivel: NivelType,
  ) {
    super(id, createdAt, updatedAt);
    this.name = name;
    this.description = description;
    this.nivel = nivel;
  }

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  nivel: NivelType;
}
