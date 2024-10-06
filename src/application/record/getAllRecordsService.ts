import { Inject, Injectable } from '@nestjs/common';
import { RecordRepository } from '../../infrastructure/typeORM/repository/recordRepository';
import { RecordDto } from '../../presentation/dto/record/recordDto';

@Injectable()
export class GetAllRecordsService {
    constructor(@Inject(RecordRepository) private readonly recordRepository: RecordRepository) {}

    async execute(): Promise<RecordDto[]> {
        const records = await this.recordRepository.findAll();
        return records.map((record) => new RecordDto(record));
    }
}
