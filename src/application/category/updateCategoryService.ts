import { Inject, Injectable } from '@nestjs/common';

import { Category } from '../../domain/model/entities/category';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../../domain/model/valueObjects/category/categoryName/categoryName';
import { LastUpdate } from '../../domain/model/valueObjects/lastUpdate/lastUpdate';
import { CategoryDuplicationCheckService } from '../../domain/services/categoryDuplicationCheckService';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';

export type UpdateCategoryCommand = {
    categoryId: string;
    categoryName: string;
    lastUpdate: string;
};

@Injectable()
export class UpdateCategoryService {
    constructor(
        @Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository,
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
    ) {}

    async execute(categoryId: string, updateCategoryCommand: UpdateCategoryCommand): Promise<void> {
        const category = Category.create(
            new CategoryName(updateCategoryCommand.categoryName),
            this.categoryDuplicationCheckService,
            new CategoryId(categoryId),
            new LastUpdate(new Date(updateCategoryCommand.lastUpdate)),
        );

        await this.categoryRepository.update(category);
    }
}

