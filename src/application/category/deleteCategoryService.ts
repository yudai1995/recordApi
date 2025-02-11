import { Inject, Injectable } from '@nestjs/common';

import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { DaleteCategoryDto } from '../../presentation/dto/category/deleteCategoryDto';

@Injectable()
export class DeleteCategoryService {
    constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

    async execute(categoryId: CategoryId): Promise<DaleteCategoryDto> {
        await this.categoryRepository.delete(categoryId);
        return new DaleteCategoryDto(null);
    }
}

