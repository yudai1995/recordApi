import { Inject, Injectable } from '@nestjs/common';

import { Record } from '../../domain/model/entities/record';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { LastUpdate } from '../../domain/model/valueObjects/lastUpdate/lastUpdate';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { RecordDate } from '../../domain/model/valueObjects/record/recordDate/RecordDate';
import { Title } from '../../domain/model/valueObjects/record/title/title';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';

export type UpdateRecordCommand = {
    id: string;
    categoryId: string;
    title: string;
    recordDate: string;
    lastUpdate: string;
};

@Injectable()
export class UpdateRecordService {
    constructor(@Inject(RecordRepository) private readonly recordRepository: RecordRepository) {}

    async execute(id: string, updateRecordCommand: UpdateRecordCommand): Promise<void> {
        const record = Record.create(
            new CategoryId(updateRecordCommand.categoryId),
            new Title(updateRecordCommand.title),
            new RecordDate(new Date(updateRecordCommand.recordDate)),
            new Id(id),
            new LastUpdate(new Date(updateRecordCommand.lastUpdate)),
        );

        await this.recordRepository.update(record);
    }
}

