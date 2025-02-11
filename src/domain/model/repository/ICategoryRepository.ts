import { DeleteResult } from 'mongoose';

import { Category } from '../entities/category';
import { CategoryId } from '../valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../valueObjects/category/categoryName/categoryName';

export interface ICategoryRepository {
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
    delete(categoryId: CategoryId): Promise<DeleteResult>;
    findAll(): Promise<Category[]>;
    findById(categoryId: CategoryId): Promise<Category | null>;
    findByName(categoryName: CategoryName): Promise<Category | null>;
    countRecordsByCategoryId(categoryId: CategoryId): Promise<number>;
}
