import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityManager } from 'typeorm';
import { Record as TypeORMRecord } from '../entities/record.entity';
import { Record as DomainRecord } from '../../../domain/model/entities/record';
import { IRecordRepository } from '../../../domain/model/repository/IRecordRepository';
import { RecordConverter } from '../../../infrastructure/converter/recordConverter';
import { Id } from '../../../domain/model/valueObjects/record/id/id';
import { CategoryId } from '../../../domain/model/valueObjects/category/categoryId/categoryid';

@Injectable()
export class RecordRepository implements IRecordRepository {
    constructor(private readonly entityManager: EntityManager) {}

    /**
     * 新規レコードを保存
     * @param domainRecord レコードエンティティ
     * @param entityManager
     */
    async save(domainRecord: DomainRecord, entityManager: EntityManager): Promise<DomainRecord> {
        const typeormRecord = RecordConverter.toTypeORM(domainRecord);
        const newTypeormRecord = await entityManager.save(typeormRecord).catch((e: { message: any }) => {
            throw new InternalServerErrorException(`[${e.message}]：レコードの登録に失敗しました。`);
        });
        return RecordConverter.toDomain(newTypeormRecord);
    }

    /**
     * レコードを更新
     * @param domainRecord レコードエンティティ
     * @param entityManager
     */
    async update(domainRecord: DomainRecord, entityManager: EntityManager): Promise<void> {
        const typeormRecord = RecordConverter.toTypeORM(domainRecord);

        const record = await this.findById(new Id(typeormRecord.id.toString()));
        if (!record) {
            throw new NotFoundException();
        }

        await entityManager.update(TypeORMRecord, typeormRecord.id, {
            categoryId: typeormRecord.categoryId,
            title: typeormRecord.title,
            recordDate: typeormRecord.recordDate,
            lastUpdate: typeormRecord.lastUpdate,
        });
    }

    /**
     * レコードを削除
     * @param id レコードID
     * @param entityManager
     */
    async delete(id: Id, entityManager: EntityManager): Promise<DeleteResult> {
        const record = await this.findById(id);
        if (!record) {
            throw new NotFoundException();
        }

        return await entityManager.delete(TypeORMRecord, record.id.value);
    }

    /**
     * 全てのレコードを取得
     */
    async findAll(): Promise<DomainRecord[]> {
        const typeormRecords = await this.entityManager
            .find(TypeORMRecord, {
                order: {
                    recordDate: 'DESC',
                },
            })
            .catch((e) => {
                throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
            });

        return await Promise.all(typeormRecords.map((record) => RecordConverter.toDomain(record)));
    }

    /**
     * IDでレコードを取得
     * @param recordId レコードID
     */
    async findById(id: Id): Promise<DomainRecord | null> {
        const typeormRecord = await this.entityManager
            .findOne(TypeORMRecord, {
                where: { id: Number(id.value) },
            })
            .then((res) => {
                if (!res) {
                    throw new NotFoundException('記録が見つかりません。');
                }
                return res;
            });

        return typeormRecord ? RecordConverter.toDomain(typeormRecord) : null;
    }

    /**
     * カテゴリIDでレコードを取得
     * @param categoryId カテゴリID
     */
    async findByCategoryIdId(categoryId: CategoryId): Promise<number | null> {
        const typeormRecords = await this.entityManager
            .find(TypeORMRecord, {
                where: { categoryId: Number(categoryId.value) },
            })
            .then((res) => {
                if (!res) {
                    throw new NotFoundException('記録が見つかりません。');
                }
                return res;
            });

        return typeormRecords.length ?? null;
    }
}
