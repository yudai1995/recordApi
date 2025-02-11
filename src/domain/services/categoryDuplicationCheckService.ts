import { ICategoryRepository } from '../model/repository/ICategoryRepository';
import { CategoryName } from '../model/valueObjects/category/categoryName/categoryName';

/**
 * カテゴリ名を重複チェックをするドメインサービス
 */
export class CategoryDuplicationCheckService {
    constructor(private categoryRepository: ICategoryRepository) {}

    async execute(categoryName: CategoryName): Promise<boolean> {
        const duplicateCategoryName = await this.categoryRepository.findByName(categoryName);
        const isDuplicate = duplicateCategoryName !== null;

        return isDuplicate;
    }
}
