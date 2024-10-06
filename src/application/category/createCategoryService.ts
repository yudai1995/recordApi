import { Injectable, Inject } from '@nestjs/common';
import { ITransactionManager } from '../../domain/model/shared/ITransactionManager';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { Category } from '../../domain/model/entities/category';
import { CategoryName } from '../../domain/model/valueObjects/category/categoryName/categoryName';
import { CategoryDuplicationCheckService } from '../../domain/services/categoryDuplicationCheckService';

export type CreateCategoryCommand = {
    categoryName: string;
};

@Injectable()
export class CreateCategoryService {
    constructor(
        @Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository,
        @Inject(CategoryDuplicationCheckService)
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
        @Inject('ITransactionManager') private readonly transactionManager: ITransactionManager,
    ) {}

    async execute(createCategoryCommand: CreateCategoryCommand): Promise<void> {
        return this.transactionManager.begin(async (entityManager) => {
            const category = Category.create(
                new CategoryName(createCategoryCommand.categoryName),
                this.categoryDuplicationCheckService,
            );
            await this.categoryRepository.save(category, entityManager);
        });
    }
}
