import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/typeORM/repository/categoryRepository';
import { CategoryDto } from '../../presentation/dto/category/categoryDto';

@Injectable()
export class GetAllCategorysService {
    constructor(@Inject(CategoryRepository) private readonly categoryRepository: CategoryRepository) {}

    async execute(): Promise<CategoryDto[]> {
        const categories = await this.categoryRepository.findAll();
        return categories.map((category) => new CategoryDto(category));
    }
}
