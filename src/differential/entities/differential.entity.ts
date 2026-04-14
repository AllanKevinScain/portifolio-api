import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'differential' })
export class DifferentialEntity extends BasePortifolioEntity {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
  ) {
    super(id, createdAt, updatedAt);
    this.title = title;
    this.description = description;
  }

  @Column()
  title: string;

  @Column()
  description: string;
}
