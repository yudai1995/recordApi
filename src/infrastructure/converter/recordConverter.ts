import { Record as TypeORMRecord } from '../typeORM/entities/record.entity';
import { Record as DomainRecord } from '../../domain/model/entities/record';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { LastUpdate } from '../../domain/model/valueObjects/lastUpdate/lastUpdate';
import { Id } from '../../domain/model/valueObjects/record/id/id';
import { RecordDate } from '../../domain/model/valueObjects/record/recordDate/RecordDate';
import { Title } from '../../domain/model/valueObjects/record/title/title';

export class RecordConverter {
    /**
     * TypeORMエンティティからDDDエンティティに変換
     */
    static async toDomain(typeormRecord: TypeORMRecord): Promise<DomainRecord> {
        return DomainRecord.create(
            new CategoryId(`${typeormRecord.categoryId}`),
            new Title(typeormRecord.title),
            new RecordDate(typeormRecord.recordDate),
            new Id(`${typeormRecord.id}`),
            new LastUpdate(typeormRecord.lastUpdate),
        );
    }

    /**
     * DDDエンティティからTypeORMエンティティに変換
     */
    static toTypeORM(domainRecord: DomainRecord): TypeORMRecord {
        const typeormRecord = new TypeORMRecord(
            Number(domainRecord.categoryId.value),
            domainRecord.title.value,
            domainRecord.recordDate.value,
            domainRecord.id.value ? Number(domainRecord.id.value) : undefined,
        );

        return typeormRecord;
    }
}
