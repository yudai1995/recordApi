import { Id } from '../valueObjects/record/id/id';
import { Record } from '../entities/record';
import { DeleteResult, EntityManager } from 'typeorm';
import { CategoryId } from '../valueObjects/category/categoryId/categoryid';

export interface IRecordRepository {
    save(record: Record, entityManager: EntityManager): Promise<Record>;
    update(record: Record, entityManager: EntityManager): Promise<void>;
    delete(recordId: Id, entityManager: EntityManager): Promise<DeleteResult>;
    findAll(): Promise<Record[]>;
    findById(recordId: Id): Promise<Record | null>;
    findByCategoryIdId(categoryId: CategoryId): Promise<number | null>;
}
