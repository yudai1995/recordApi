import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { CategoryDto } from '../../presentation/dto/category/categoryDto';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';

@Injectable()
export class FindCategoryByIdService {
    constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

    async execute(categoryId: CategoryId): Promise<CategoryDto | null> {
        const category = await this.categoryRepository.findById(categoryId);
        return category ? new CategoryDto(category) : null;
    }
}
