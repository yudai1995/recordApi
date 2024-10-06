import { Injectable, Inject } from '@nestjs/common';
import { ITransactionManager } from '../../domain/model/shared/ITransactionManager';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { DaleteCategoryDto } from '../../presentation/dto/category/deleteCategoryDto';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';

@Injectable()
export class DeleteCategoryService {
    constructor(
        @Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository,
        @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager,
    ) {}

    async execute(categoryId: CategoryId): Promise<DaleteCategoryDto> {
        return this.transactionManager.begin(async (entityManager) => {
            const result = await this.categoryRepository.delete(categoryId, entityManager);
            return new DaleteCategoryDto(result.raw ? result.raw : null);
        });
    }
}
