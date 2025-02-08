import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DeleteResult } from 'typeorm';

import { Category as DomainCategory } from '../../../domain/model/entities/category';
import { ICategoryRepository } from '../../../domain/model/repository/ICategoryRepository';
import { CategoryId } from '../../../domain/model/valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../../../domain/model/valueObjects/category/categoryName/categoryName';
import { CategoryDuplicationCheckService } from '../../../domain/services/categoryDuplicationCheckService';
import { CategoryConverter } from '../../converter/categoryConverter';
import { Category as MongooseCategory } from '../schema/category.schema';

import { RecordRepository } from './recordRepository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
    constructor(
        // MongooseModule でインポートした場合は @nestjs/mongoose に用意されている
        // @InjectModel デコレータでインジェクション時に名前を定義する必要がある
        @InjectModel(MongooseCategory.name) private readonly categoryModel: Model<MongooseCategory>,
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
        @Inject(RecordRepository) private readonly recordRepository: RecordRepository,
    ) {}

    /**
     * 新規カテゴリを保存
     * @param domainCategory カテゴリエンティティ
     */
    async save(domainCategory: DomainCategory): Promise<void> {
        const mongooseCategory = CategoryConverter.toMongoose(domainCategory);
        await new this.categoryModel(mongooseCategory).save();
    }

    /**
     * カテゴリ名を更新
     * @param domainCategory カテゴリエンティティ
     */
    async update(domainCategory: DomainCategory): Promise<void> {
        const mongooseCategory = CategoryConverter.toMongoose(domainCategory);
        await this.categoryModel.updateOne(
            { _id: mongooseCategory._id },
            { categoryName: mongooseCategory.categoryName },
        );
    }

    /**
     * IDでカテゴリを取得
     * @param categoryId カテゴリID
     */
    async findById(categoryId: CategoryId): Promise<DomainCategory | null> {
        const category = await this.categoryModel.findById(categoryId.value).exec();
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
        const category = await this.categoryModel.findOne({ categoryName: categoryName.value }).exec();
        if (!category) {
            return null;
        }
        return CategoryConverter.toDomain(category, this.categoryDuplicationCheckService, this);
    }

    /**
     * 全てのカテゴリを取得
     */
    async findAll(): Promise<DomainCategory[]> {
        const mongooseCategories = await this.categoryModel
            .find()
            .sort({ _id: 'asc' })
            .exec()
            .catch((e) => {
                throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
            });

        return await Promise.all(
            mongooseCategories.map((category) =>
                CategoryConverter.toDomain(category, this.categoryDuplicationCheckService, this),
            ),
        );
    }

    /**
     * カテゴリを削除
     * @param categoryId カテゴリID
     * @param entityManager
     */
    async delete(categoryId: CategoryId): Promise<DeleteResult> {
        const record = await this.findById(categoryId);
        if (!record) {
            throw new NotFoundException();
        }

        await this.categoryModel.deleteOne({ _id: categoryId.value }).exec();
        return { raw: 1 };
    }

    /**
     * カテゴリに関連付けられたレコードの数を取得する
     * @param categoryId カテゴリID
     * @returns レコードの数
     */
    async countRecordsByCategoryId(categoryId: CategoryId): Promise<number> {
        return await this.recordRepository.findByCategoryId(categoryId);
    }
}
