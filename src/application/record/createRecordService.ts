import { Inject, Injectable } from '@nestjs/common';
import { Record } from '../../domain/model/entities/record';
import { ITransactionManager } from '../../domain/model/shared/ITransactionManager';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { Title } from '../../domain/model/valueObjects/record/title/title';
import { RecordDate } from '../../domain/model/valueObjects/record/recordDate/RecordDate';
import { RecordDto } from '../../presentation/dto/record/recordDto';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';

export type CreateRecordCommand = {
    categoryId: string;
    title: string;
    recordDate: string;
};

@Injectable()
export class CreateRecordService {
    constructor(
        @Inject(RecordRepository) private readonly recordRepository: RecordRepository,
        @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager,
    ) {}

    async execute(createRecordCommand: CreateRecordCommand): Promise<RecordDto> {
        return this.transactionManager.begin(async (entityManager) => {
            const record = Record.create(
                new CategoryId(createRecordCommand.categoryId),
                new Title(createRecordCommand.title),
                new RecordDate(new Date(createRecordCommand.recordDate)),
            );
            const newRecord = await this.recordRepository.save(record, entityManager);

            return new RecordDto(newRecord);
        });
    }
}
