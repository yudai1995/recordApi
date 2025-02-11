import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult, Model } from 'mongoose';

import { Record as DomainRecord } from '../../../domain/model/entities/record';
import { IRecordRepository } from '../../../domain/model/repository/IRecordRepository';
import { CategoryId } from '../../../domain/model/valueObjects/category/categoryId/categoryid';
import { Id } from '../../../domain/model/valueObjects/record/id/id';
import { RecordConverter } from '../../../infrastructure/converter/recordConverter';
import { Record } from '../schema/record.schema';

@Injectable()
export class RecordRepository implements IRecordRepository {
    // MongooseModule でインポートした場合は @nestjs/mongoose に用意されている
    // @InjectModel デコレータでインジェクション時に名前を定義する必要がある
    constructor(@InjectModel(Record.name) private readonly recordModel: Model<Record>) {}

    /**
     * 新規レコードを保存
     * @param domainRecord レコードエンティティ
     */
    async save(domainRecord: DomainRecord): Promise<DomainRecord> {
        const newModel = await new this.recordModel({
            id: domainRecord.id.value,
            categoryId: domainRecord.categoryId.value,
            title: domainRecord.title.value,
            recordDate: domainRecord.recordDate.value,
        })
            .save()
            .catch((e: { message: any }) => {
                throw new InternalServerErrorException(`[${e.message}]：レコードの登録に失敗しました。`);
            });
        return RecordConverter.toDomain(newModel);
    }

    /**
     * レコードを更新
     * @param domainRecord レコードエンティティ
     */
    async update(domainRecord: DomainRecord): Promise<void> {
        const record = await this.findById(new Id(domainRecord.id.value.toString()));
        if (!record) {
            throw new NotFoundException();
        }

        await this.recordModel
            .updateOne(
                { id: domainRecord.id.value },
                {
                    categoryId: domainRecord.categoryId.value,
                    title: domainRecord.title.value,
                    recordDate: domainRecord.recordDate.value,
                    lastUpdate: new Date(),
                },
                { new: true },
            )
            .exec()
            .catch((e: { message: any }) => {
                throw new InternalServerErrorException(`[${e.message}]：レコードの更新に失敗しました。`);
            });
    }

    /**
     * レコードを削除
     * @param id レコードID
     */
    async delete(id: Id): Promise<DeleteResult> {
        const result = await this.recordModel.deleteOne({ id: id.value }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('削除対象のレコードが見つかりません。');
        }
        return result;
    }

    /**
     * 全てのレコードを取得
     */
    async findAll(): Promise<DomainRecord[]> {
        try {
            const mongooseRecords = await this.recordModel
                .find()
                .sort({ recordDate: -1 }) // 降順にソート
                .exec();

            return Promise.all(mongooseRecords.map((record) => RecordConverter.toDomain(record)));
        } catch (e) {
            throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
        }
    }

    /**
     * IDでレコードを取得
     * @param id レコードID
     */
    async findById(id: Id): Promise<DomainRecord | null> {
        try {
            const mongooseRecord = await this.recordModel.findOne({ id: id.value }).exec();
            if (!mongooseRecord) {
                throw new NotFoundException('記録が見つかりません。');
            }
            return RecordConverter.toDomain(mongooseRecord);
        } catch (e) {
            throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
        }
    }

    /**
     * カテゴリIDでレコードを取得
     * @param categoryId カテゴリID
     */
    async findByCategoryId(categoryId: CategoryId): Promise<number | null> {
        try {
            const mongooseRecords = await this.recordModel.find({ categoryId: categoryId.value }).exec();
            return mongooseRecords.length;
        } catch (e) {
            throw new InternalServerErrorException(`[${e.message}]：レコードの取得に失敗しました。`);
        }
    }
}
