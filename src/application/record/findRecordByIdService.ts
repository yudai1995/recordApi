import { Inject, Injectable } from '@nestjs/common';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { RecordDto } from '../../presentation/dto/record/recordDto';

@Injectable()
export class FindRecordByIdService {
    constructor(@Inject(RecordRepository) private readonly recordRepository: RecordRepository) {}

    async execute(recordId: Id): Promise<RecordDto | null> {
        const record = await this.recordRepository.findById(recordId);
        return record ? new RecordDto(record) : null;
    }
}
