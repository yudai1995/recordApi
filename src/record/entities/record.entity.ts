import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('record')
export class Record {
  @PrimaryGeneratedColumn({
    comment: 'レコードID',
  })
  readonly id: number;

  @Column('integer', { comment: 'カテゴリ' })
  category: number;

  @Column('varchar', { comment: 'タイトル' })
  title: string;

  @Column({ name: 'recordDate', type: 'date' })
  public recordDate: string;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly lastUpdate?: Timestamp;

  constructor(category: number, title: string) {
    this.category = category;
    this.title = title;
  }
}
