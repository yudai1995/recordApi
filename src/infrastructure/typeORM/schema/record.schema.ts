import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Record extends Document {
    @Prop({
        type: Number,
        unique: true,
        required: true,
        comment: 'レコードID',
    })
    readonly id: number;

    @Prop({
        type: Number,
        required: true,
        comment: 'カテゴリ',
    })
    public categoryId: number;

    @Prop({
        type: String,
        required: true,
        comment: 'タイトル',
    })
    public title: string;

    @Prop({
        type: Date,
        required: true,
        comment: '記録日',
    })
    public recordDate: Date;

    @Prop({
        type: Date,
        default: Date.now,
        comment: '最終更新日時',
    })
    readonly lastUpdate: Date;

    constructor(categoryId: number, title: string, recordDate: Date, id?: number) {
        super();
        this.categoryId = categoryId;
        this.title = title;
        this.recordDate = recordDate;
        this.lastUpdate = new Date();
        if (id) {
            (this as any).id = id; // idをreadonlyでも初期化できるように一時的にキャスト
        }
    }
}

export const RecordSchema = SchemaFactory.createForClass(Record);
