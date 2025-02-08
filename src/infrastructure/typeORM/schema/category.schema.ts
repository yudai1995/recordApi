import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
    @Prop({
        type: Number,
        unique: true,
        required: true,
        comment: 'カテゴリID',
    })
    readonly categoryId: number;

    @Prop({
        type: String,
        length: 50,
        unique: true,
        required: true,
        comment: 'カテゴリ名',
    })
    public categoryName: string;

    @Prop({
        type: Date,
        default: Date.now,
        comment: '作成日時',
    })
    public createDate: Date;

    @Prop({
        type: Date,
        default: Date.now,
        comment: '最終更新日時',
    })
    readonly lastUpdate: Date;

    constructor(categoryName: string, createDate: Date = new Date(), categoryId?: number) {
        super();
        this.categoryName = categoryName;
        this.createDate = createDate;
        if (categoryId) {
            (this as any).categoryId = categoryId; // categoryIdをreadonlyでも初期化できるように一時的にキャスト
        }
    }
}

export const CategorySchema = SchemaFactory.createForClass(Category);
