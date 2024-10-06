import { Category } from '../../../domain/model/entities/category';

export class CategoryDto {
    readonly categoryId: string;
    readonly categoryName: string;
    readonly lastUpdate: Date;

    constructor(category: Category) {
        this.categoryId = category.categoryId.value;
        this.categoryName = category.categoryName.value;
        this.lastUpdate = category.lastUpdate.value;
    }
}
