import { DeleteResult, EntityManager } from 'typeorm';
import { Category } from '../../domain/model/entities/category';
import { ICategoryRepository } from '../../domain/model/repository/ICategoryRepository';
import { CategoryId } from '../../domain/model/valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../../domain/model/valueObjects/category/categoryName/categoryName';

export class InMemoryCategoryRepository implements ICategoryRepository {
    public DB: {
        [id: string]: Category;
    } = {};

    async save(category: Category) {
        this.DB[category.categoryId.value] = category;
        this.DB[category.categoryName.value] = category;
    }

    async update(category: Category) {
        this.DB[category.categoryId.value] = category;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(categoryId: CategoryId, entityManager: EntityManager): Promise<DeleteResult> {
        delete this.DB[categoryId.value];

        return { raw: 1 };
    }

    async findById(categoryId: CategoryId): Promise<Category | null> {
        const category = Object.entries(this.DB).find(([id]) => {
            return categoryId.value === id.toString();
        });

        return category ? category[1] : null;
    }

    async findByName(categoryName: CategoryName): Promise<Category | null> {
        const category = Object.entries(this.DB).find(([name]) => {
            return categoryName.value === name.toString();
        });

        return category ? category[1] : null;
    }

    async findAll(): Promise<Category[]> {
        return Object.values(this.DB);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async countRecordsByCategoryId(categoryId: CategoryId): Promise<number> {
        return 2;
    }
}
