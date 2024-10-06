import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityManager } from 'typeorm';
import { CategoryName } from '../../../domain/model/valueObjects/category/categoryName/categoryName';

import { Category as TypeORMCategory } from '../entities/category.entity';
import { Category as DomainCategory } from '../../../domain/model/entities/category';
import { CategoryConverter } from '../../converter/categoryConverter';
import { ICategoryRepository } from '../../../domain/model/repository/ICategoryRepository';
import { CategoryDuplicationCheckService } from '../../../domain/services/categoryDuplicationCheckService';
import { CategoryId } from '../../../domain/model/valueObjects/category/categoryId/categoryid';
import { RecordRepository } from './recordRepository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
        @Inject(RecordRepository) private readonly recordRepository: RecordRepository,
    ) {}

    /**
     * 新規カテゴリを保存
     * @param domainCategory カテゴリエンティティ
     * @param entityManager
     */
    async save(domainCategory: DomainCategory, entityManager: EntityManager): Promise<void> {
        const typeormCategory = CategoryConverter.toTypeORM(domainCategory);
        await entityManager.save(typeormCategory);
    }

    /**
     * カテゴリ名を更新
     * @param domainCategory カテゴリエンティティ
     * @param entityManager
     */
    async update(domainCategory: DomainCategory, entityManager: EntityManager): Promise<void> {
        const typeormCategory = CategoryConverter.toTypeORM(domainCategory);
        await entityManager.update(TypeORMCategory, typeormCategory.categoryId, {
            categoryName: typeormCategory.categoryName,
        });
    }

    /**
     * IDでカテゴリを取得
     * @param categoryId カテゴリID
     */
    async findById(categoryId: CategoryId): Promise<DomainCategory | null> {
        const category = await this.entityManager.findOneBy(TypeORMCategory, { categoryId: Number(categoryId.value) });
        if (!category) {
            return null;
        }

        return CategoryConverter.toDomain(category, this.categoryDuplicationCheckService, this);
    }

    /**
     * カテゴリ名でカテゴリを取得
     * @param categoryName カテゴリ名
     */
    async findByName(categoryName: CategoryName): Promise<DomainCategory | null> {
        const category = await this.entityManager.findOneBy(TypeORMCategory, { categoryName: categoryName.value });
        if (!category) {
            return null;
        }
        return CategoryConverter.toDomain(category, this.categoryDuplicationCheckService, this);
    }

    /**
     * 全てのカテゴリを取得
     */
    async findAll(): Promise<DomainCategory[]> {
        const typeormCategories = await this.entityManager
            .find(TypeORMCategory, {
                order: {
                    categoryId: 'ASC',
                },
            })
            .catch((e) => {
                throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
            });

        return await Promise.all(
            typeormCategories.map((category) =>
                CategoryConverter.toDomain(category, this.categoryDuplicationCheckService, this),
            ),
        );
    }

    /**
     * カテゴリを削除
     * @param categoryId カテゴリID
     * @param entityManager
     */
    async delete(categoryId: CategoryId, entityManager: EntityManager): Promise<DeleteResult> {
        const record = await this.findById(categoryId);
        if (!record) {
            throw new NotFoundException();
        }

        return await entityManager.delete(TypeORMCategory, { categoryId: Number(categoryId.value) });
    }

    /**
     * カテゴリに関連付けられたレコードの数を取得する
     * @param categoryId カテゴリID
     * @returns レコードの数
     */
    async countRecordsByCategoryId(categoryId: CategoryId): Promise<number> {
        return await this.recordRepository.findByCategoryIdId(categoryId);
    }
}
