import { CategoryId } from '../valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../valueObjects/category/categoryName/categoryName';
import { Category } from '../entities/category';
import { DeleteResult, EntityManager } from 'typeorm';

export interface ICategoryRepository {
    save(category: Category, entityManager: EntityManager): Promise<void>;
    update(category: Category, entityManager: EntityManager): Promise<void>;
    delete(categoryId: CategoryId, entityManager: EntityManager): Promise<DeleteResult>;
    findAll(): Promise<Category[]>;
    findById(categoryId: CategoryId): Promise<Category | null>;
    findByName(categoryName: CategoryName): Promise<Category | null>;
    countRecordsByCategoryId(categoryId: CategoryId): Promise<number>;
}
