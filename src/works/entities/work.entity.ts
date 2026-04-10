import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'works' })
export class Work extends BasePortifolioEntity {
  constructor(id: string, title: string, description: string, image: string) {
    super(id);
    this.title = title;
    this.description = description;
    this.image = image;
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;
}
