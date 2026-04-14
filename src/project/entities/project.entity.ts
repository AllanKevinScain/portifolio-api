import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'project' })
export class Project extends BasePortifolioEntity {
  constructor(
    id: string,
    title: string,
    description: string,
    repository: string,
    demo: string,
  ) {
    super(id);
    this.title = title;
    this.description = description;
    this.repository = repository;
    this.demo = demo;
  }

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  repository: string;

  @Column()
  demo: string;
}
