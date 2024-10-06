import { Category as TypeORMCategory } from '../typeORM/entities/category.entity';
import { Category as DomainCategory } from '../../domain/model/entities/category';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../../domain/model/valueObjects/category/categoryName/categoryName';
import { LastUpdate } from '../../domain/model/valueObjects/lastUpdate/lastUpdate';
import { CategoryDuplicationCheckService } from '../../domain/services//categoryDuplicationCheckService';
import { NumberOfRecords } from '../../domain/model/valueObjects/category/numberOfRecords/numberOfRecords';
import { CategoryRepository } from '../typeORM/repository/categoryRepository';

export class CategoryConverter {
    /**
     * TypeORMエンティティからDDDエンティティに変換
     */
    static async toDomain(
        typeormCategory: TypeORMCategory,
        categoryDuplicationCheckService: CategoryDuplicationCheckService,
        categoryRepository: CategoryRepository,
    ): Promise<DomainCategory> {
        const numberOfRecords = await categoryRepository.countRecordsByCategoryId(
            new CategoryId(typeormCategory.categoryId.toString()),
        ); // レコード数を取得

        return new DomainCategory(
            new CategoryId(`${typeormCategory.categoryId}`),
            new CategoryName(typeormCategory.categoryName),
            new NumberOfRecords(numberOfRecords),
            new LastUpdate(typeormCategory.lastUpdate),
            categoryDuplicationCheckService,
        );
    }

    /**
     * DDDエンティティからTypeORMエンティティに変換
     */
    static toTypeORM(domainCategory: DomainCategory): TypeORMCategory {
        const typeormCategory = new TypeORMCategory(
            domainCategory.categoryName.value,
            new Date(),
            Number(domainCategory.categoryId.value),
        );
        typeormCategory.categoryName = domainCategory.categoryName.value;

        return typeormCategory;
    }
}
