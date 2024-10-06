import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn({
        comment: 'カテゴリID',
    })
    readonly categoryId: number;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        comment: 'カテゴリ名',
    })
    public categoryName: string;

    @CreateDateColumn({ comment: '作成日時' })
    public createDate: Date;

    @UpdateDateColumn({ comment: '最終更新日時' })
    readonly lastUpdate: Date;

    constructor(categoryName: string, createDate: Date = new Date(), categoryId?: number) {
        this.categoryName = categoryName;
        this.createDate = createDate;
        if (categoryId) {
            (this as any).categoryId = categoryId; // categoryIdをreadonlyでも初期化できるように一時的にキャスト
        }
    }
}
