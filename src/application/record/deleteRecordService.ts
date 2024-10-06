import { Inject, Injectable } from '@nestjs/common';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { ITransactionManager } from '../../domain/model/shared/ITransactionManager';
import { DaleteRecordDto } from '../../presentation/dto/record/deleteRecordDto';

@Injectable()
export class DeleteRecordService {
    constructor(
        @Inject(RecordRepository) private readonly recordRepository: RecordRepository,
        @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager,
    ) {}

    async execute(recordId: Id): Promise<DaleteRecordDto> {
        return this.transactionManager.begin(async (entityManager) => {
            const result = await this.recordRepository.delete(recordId, entityManager);
            return new DaleteRecordDto(result.raw ? result.raw : null);
        });
    }
}
