import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'works' })
export class Work extends BasePortifolioEntity {
  constructor(id: string, title: string, description: string) {
    super(id);
    this.title = title;
    this.description = description;
  }

  @Column()
  title: string;

  @Column()
  description: string;
}
