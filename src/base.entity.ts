import { BeforeInsert, PrimaryColumn } from 'typeorm';
import { nanoid } from 'nanoid';

export abstract class BasePortifolioEntity {
  constructor(id: string) {
    this.id = id;
  }

  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    if (!this.id) {
      this.id = nanoid();
    }
  }
}
