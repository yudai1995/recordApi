import { CategoryDuplicationCheckService } from '../../services/categoryDuplicationCheckService';
import { CategoryId } from '../valueObjects/category/categoryId/categoryid';
import { CategoryName } from '../valueObjects/category/categoryName/categoryName';
import { NumberOfRecords } from '../valueObjects/category/numberOfRecords/numberOfRecords';
import { LastUpdate } from '../valueObjects/lastUpdate/lastUpdate';

export class Category {
    constructor(
        private readonly _categoryId: CategoryId,
        private _categoryName: CategoryName,
        private _numberOfRecords: NumberOfRecords,
        private _lastUpdate: LastUpdate,
        private readonly categoryDuplicationCheckService: CategoryDuplicationCheckService,
    ) {}

    get categoryId(): CategoryId {
        return this._categoryId;
    }

    get categoryName(): CategoryName {
        return this._categoryName;
    }

    get numberOfRecords(): NumberOfRecords {
        return this._numberOfRecords;
    }

    get lastUpdate(): LastUpdate {
        return this._lastUpdate;
    }

    /**
     * 新規エンティティの生成
     * @param categoryName カテゴリ名
     * @param categoryDuplicationCheckService カテゴリ重複チェックサービス
     * @param id カテゴリID (任意)
     */
    static create(
        categoryName: CategoryName,
        categoryDuplicationCheckService: CategoryDuplicationCheckService,
        categoryId?: CategoryId,
        lastUpdate?: LastUpdate,
    ) {
        const defaultId = categoryId ?? new CategoryId();
        const defaultNumberOfRecords = new NumberOfRecords(0);
        const defaultLastUpdate = lastUpdate ?? new LastUpdate(new Date());

        return new Category(
            defaultId,
            categoryName,
            defaultNumberOfRecords,
            defaultLastUpdate,
            categoryDuplicationCheckService,
        );
    }

    /**
     * カテゴリ名を更新する
     * @param newName 新しいカテゴリ名
     * @throws Error もし記録が存在する場合、カテゴリ名の更新を確認する必要がある
     * @throws Error もし同名のカテゴリ名が存在する場合、更新不可とする
     */
    public async updateCategoryName(newName: CategoryName): Promise<void> {
        if (this._numberOfRecords.value > 0) {
            throw new Error('カテゴリに関連付けられた記録が存在するため、カテゴリ名を更新できません。');
        }

        const isDuplicate = await this.categoryDuplicationCheckService.execute(newName);

        if (isDuplicate) {
            throw new Error('同名のカテゴリ名が存在するため、カテゴリ名を更新できません。');
        }

        this._categoryName = newName;
        this.updateLastUpdate();
    }

    /**
     * カテゴリを削除
     */
    public delete() {
        this.validateDeletion();
    }

    /**
     * レコード数を増加させる
     */
    public increaseRecordCount(): void {
        this._numberOfRecords = this._numberOfRecords.increase();
        this.updateLastUpdate();
    }

    /**
     * カテゴリの最終更新日時を更新
     */
    private updateLastUpdate(): void {
        this._lastUpdate = new LastUpdate(new Date());
    }

    /**
     * カテゴリを削除可能か確認する
     * @throws Error もし記録が存在する場合、カテゴリは削除できない
     */
    public validateDeletion(): void {
        if (this._numberOfRecords.value > 0) {
            throw new Error('記録が存在するため、カテゴリは削除できません。');
        }
    }
}
