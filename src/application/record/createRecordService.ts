import { Inject, Injectable } from '@nestjs/common';

import { Record } from '../../domain/model/entities/record';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { RecordDate } from '../../domain/model/valueObjects/record/recordDate/RecordDate';
import { Title } from '../../domain/model/valueObjects/record/title/title';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { RecordDto } from '../../presentation/dto/record/recordDto';

export type CreateRecordCommand = {
    categoryId: string;
    title: string;
    recordDate: string;
};

@Injectable()
export class CreateRecordService {
    constructor(@Inject(RecordRepository) private readonly recordRepository: RecordRepository) {}

    async execute(createRecordCommand: CreateRecordCommand): Promise<RecordDto> {
        const record = Record.create(
            new CategoryId(createRecordCommand.categoryId),
            new Title(createRecordCommand.title),
            new RecordDate(new Date(createRecordCommand.recordDate)),
        );
        const newRecord = await this.recordRepository.save(record);
        return new RecordDto(newRecord);
    }
}

