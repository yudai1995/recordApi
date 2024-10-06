import { CategoryId } from '../valueObjects/category/categoryId/categoryid';
import { LastUpdate } from '../valueObjects/lastUpdate/lastUpdate';
import { Id } from '../valueObjects/record/id/id';
import { RecordDate } from '../valueObjects/record/recordDate/RecordDate';
import { Title } from '../valueObjects/record/title/title';

export class Record {
    private constructor(
        private readonly _id: Id,
        private _categoryId: CategoryId,
        private _title: Title,
        private _recordDate: RecordDate,
        private _lastUpdate: LastUpdate,
    ) {}

    /**
     * 新規レコードの生成
     */
    static create(categoryId: CategoryId, title: Title, recordDate: RecordDate, id?: Id, lastUpdate?: LastUpdate) {
        const defaultId = id ?? new Id();
        const defaultLastUpdate = lastUpdate ?? new LastUpdate(new Date());
        return new Record(defaultId, categoryId, title, recordDate, defaultLastUpdate);
    }

    public delete() {
        // Todo: 削除時のロジック
    }

    /**
     * カテゴリの更新
     * @param newCategoryId 新しいカテゴリID
     */
    public changeCategoryId(newCategoryId: CategoryId) {
        this._categoryId = newCategoryId;
        this.updateLastUpdate();
    }

    /**
     * 記録タイトルの更新
     * @param newTitle 新しいタイトル
     */
    public changeTitle(newTitle: Title) {
        this._title = newTitle;
        this.updateLastUpdate();
    }

    /**
     * 記録日付の更新
     * @param newDate 新しい記録日時
     */
    public changeRecordDate(newRecordDate: RecordDate) {
        this._recordDate = newRecordDate;
        this.updateLastUpdate();
    }

    /**
     * 記録の最終更新日時を更新
     */
    public changeLastUpdate(newLastUpdate: LastUpdate) {
        this._lastUpdate = newLastUpdate;
    }

    private updateLastUpdate() {
        this._lastUpdate = new LastUpdate(new Date());
    }

    // エンティティの再構築
    static reconstruct(id: Id, categoryId: CategoryId, title: Title, recordDate: RecordDate, lastUpdate: LastUpdate) {
        return new Record(id, categoryId, title, recordDate, lastUpdate);
    }

    get id(): Id {
        return this._id;
    }

    get categoryId(): CategoryId {
        return this._categoryId;
    }

    get title(): Title {
        return this._title;
    }

    get recordDate(): RecordDate {
        return this._recordDate;
    }

    get lastUpdate(): LastUpdate {
        return this._lastUpdate;
    }
}
