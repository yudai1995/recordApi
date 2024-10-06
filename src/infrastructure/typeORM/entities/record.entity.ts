import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('record')
export class Record {
    @PrimaryGeneratedColumn({
        comment: 'レコードID',
    })
    readonly id: number;

    @Column('integer', { comment: 'カテゴリ' })
    public categoryId: number;

    @Column('varchar', { comment: 'タイトル' })
    public title: string;

    @Column({ name: 'recordDate', type: 'date' })
    public recordDate: Date;

    @UpdateDateColumn({ comment: '最終更新日時' })
    readonly lastUpdate: Date;

    constructor(categoryId: number, title: string, recordDate: Date, id?: number) {
        this.categoryId = categoryId;
        this.title = title;
        this.recordDate = recordDate;
        this.lastUpdate = new Date();
        this.id = id;
    }
}
