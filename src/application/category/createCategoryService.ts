import { Inject, Injectable } from '@nestjs/common';

import { Category } from '../../domain/model/entities/category';
import { CategoryName } from '../../domain/model/valueObjects/category/categoryName/categoryName';
import { CategoryDuplicationCheckService } from '../../domain/services/categoryDuplicationCheckService';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';

export type CreateCategoryCommand = {
    categoryName: string;
};

@Injectable()
export class CreateCategoryService {
    constructor(
        @Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository,
        @Inject(CategoryDuplicationCheckService)
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
    ) {}

    async execute(createCategoryCommand: CreateCategoryCommand): Promise<void> {
        const category = Category.create(
            new CategoryName(createCategoryCommand.categoryName),
            this.categoryDuplicationCheckService,
        );
        await this.categoryRepository.save(category);
    }
}

