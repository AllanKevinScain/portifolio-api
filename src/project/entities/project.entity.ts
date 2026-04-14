import { BasePortifolioEntity } from 'src/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'project' })
export class ProjectEntity extends BasePortifolioEntity {
  constructor(
    id: string,
    createdAt: Date,
    updatedAt: Date,
    title: string,
    description: string,
    repository: string,
    demo: string,
  ) {
    super(id, createdAt, updatedAt);
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
