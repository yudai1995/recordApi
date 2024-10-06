import { Record } from '../../../domain/model/entities/record';

export class RecordDto {
    readonly id: string;
    readonly categoryId: string;
    readonly title: string;
    readonly recordDate: Date;
    readonly lastUpdate: Date;

    constructor(record: Record) {
        this.id = record.id.value;
        this.categoryId = record.categoryId.value;
        this.title = record.title.value;
        this.recordDate = record.recordDate.value;
        this.lastUpdate = record.lastUpdate.value;
    }
}
