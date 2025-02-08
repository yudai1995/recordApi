import { Inject, Injectable } from '@nestjs/common';

import { Id } from '../../domain/model/valueObjects/record/id/id';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { DaleteRecordDto } from '../../presentation/dto/record/deleteRecordDto';

@Injectable()
export class DeleteRecordService {
    constructor(@Inject(RecordRepository) private readonly recordRepository: RecordRepository) {}

    async execute(recordId: Id): Promise<DaleteRecordDto> {
        const result = await this.recordRepository.delete(recordId);
        return new DaleteRecordDto(result.value ? Number(result.value) : null);
    }
}

