import { Column, Entity } from 'typeorm';
import { BasePortifolioEntity } from 'src/base.entity';

@Entity({ name: 'developers' })
export class Developer extends BasePortifolioEntity {
  constructor(id: string, name: string, linkedin: string, image: string) {
    super(id);
    this.name = name;
    this.linkedin = linkedin;
    this.image = image;
  }

  @Column()
  name: string;

  @Column()
  linkedin: string;

  @Column()
  image: string;
}
