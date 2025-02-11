import { DeleteResult } from 'mongoose';

import { Record } from '../entities/record';
import { CategoryId } from '../valueObjects/category/categoryId/categoryid';
import { Id } from '../valueObjects/record/id/id';

export interface IRecordRepository {
    save(record: Record): Promise<Record>;
    update(record: Record): Promise<void>;
    delete(recordId: Id): Promise<DeleteResult>;
    findAll(): Promise<Record[]>;
    findById(recordId: Id): Promise<Record | null>;
    findByCategoryId(categoryId: CategoryId): Promise<number | null>;
}
