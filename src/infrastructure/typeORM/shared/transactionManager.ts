import { Injectable } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';
import { ITransactionManager } from '../../../domain/model/shared/ITransactionManager';

@Injectable()
export class TransactionManager implements ITransactionManager {
    constructor(private readonly dataSource: DataSource) {}

    async begin<T>(work: (entityManager: EntityManager) => Promise<T>): Promise<T> {
        return await this.dataSource.transaction(async (entityManager: EntityManager) => {
            return await work(entityManager);
        });
    }
}
