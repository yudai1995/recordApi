import { Inject, Injectable } from '@nestjs/common';
import { Record } from '../../domain/model/entities/record';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { LastUpdate } from '../../domain/model/valueObjects/lastUpdate/lastUpdate';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { RecordDate } from '../../domain/model/valueObjects/record/recordDate/RecordDate';
import { Title } from '../../domain/model/valueObjects/record/title/title';
import { ITransactionManager } from '../../domain/model/shared/ITransactionManager';

export type UpdateRecordCommand = {
    id: string;
    categoryId: string;
    title: string;
    recordDate: string;
    lastUpdate: string;
};

@Injectable()
export class UpdateRecordService {
    constructor(
        @Inject(RecordRepository) private readonly recordRepository: RecordRepository,
        @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager,
    ) {}

    async execute(id: string, updateRecordCommand: UpdateRecordCommand): Promise<void> {
        return this.transactionManager.begin(async (entityManager) => {
            const record = Record.create(
                new CategoryId(updateRecordCommand.categoryId),
                new Title(updateRecordCommand.title),
                new RecordDate(new Date(updateRecordCommand.recordDate)),
                new Id(id),
                new LastUpdate(new Date(updateRecordCommand.lastUpdate)),
            );

            await this.recordRepository.update(record, entityManager);
        });
    }
}
