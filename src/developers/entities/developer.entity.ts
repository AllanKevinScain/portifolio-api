import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

@Entity({ name: 'developers' })
export class Developer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  linkedin: string;

  @Column()
  image: string;

  @BeforeInsert()
  generateId() {
    this.id = `${nanoid()}`;
  }
}
