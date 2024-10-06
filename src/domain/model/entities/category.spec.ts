import { InMemoryCategoryRepository } from '../../../infrastructure/inMemory/inMemoryCategoryRepository';
import { CategoryDuplicationCheckService } from '../../services/categoryDuplicationCheckService';
import { CategoryName } from '../valueObjects/category/categoryName/categoryName';
import { LastUpdate } from '../valueObjects/lastUpdate/lastUpdate';
import { Category } from './category';

describe('カテゴリのエンティティのテスト', () => {
    let inMemoryCategoryRepository: InMemoryCategoryRepository;
    let categoryDuplicationCheckService: CategoryDuplicationCheckService;

    beforeEach(() => {
        // テスト前に初期化する
        inMemoryCategoryRepository = new InMemoryCategoryRepository();
        categoryDuplicationCheckService = new CategoryDuplicationCheckService(inMemoryCategoryRepository);
    });

    test('エンティティの作成', () => {
        const category = Category.create('Books', categoryDuplicationCheckService);
        expect(category.categoryName.value).toBe('Books');
        expect(category.numberOfRecords.value).toBe(0);
        expect(category.lastUpdate).toBeInstanceOf(LastUpdate);
    });

    test('エンティティの更新', async () => {
        const category = Category.create('Books', categoryDuplicationCheckService);
        const newName = new CategoryName('Comics');
        await category.updateCategoryName(newName);
        expect(category.categoryName.value).toBe('Comics');
    });

    test('カテゴリに関連付けられた記録が存在する場合更新不可', async () => {
        const category = Category.create('Books', categoryDuplicationCheckService);
        category.increaseRecordCount(); // レコード数を1に増加

        const newName = new CategoryName('Comics');
        await expect(category.updateCategoryName(newName)).rejects.toThrowError(
            'カテゴリに関連付けられた記録が存在するため、カテゴリ名を更新できません。',
        );
    });

    test('カテゴリ名が重複している場合、更新不可', async () => {
        const mock = jest.spyOn(categoryDuplicationCheckService, 'execute').mockResolvedValue(true);

        const newName = new CategoryName('Comics');

        const category = Category.create('Books', categoryDuplicationCheckService);
        await expect(category.updateCategoryName(newName)).rejects.toThrowError(
            '同名のカテゴリ名が存在するため、カテゴリ名を更新できません。',
        );

        mock.mockReset();
    });

    test('レコード数の増加', () => {
        const category = Category.create('Books', categoryDuplicationCheckService);
        category.increaseRecordCount();
        expect(category.numberOfRecords.value).toBe(1);
    });

    test('登録されている記録が存在する場合はカテゴリを削除できない', () => {
        const category = Category.create('Books', categoryDuplicationCheckService);
        category.increaseRecordCount(); // レコード数を1に増加

        expect(() => category.delete()).toThrowError('記録が存在するため、カテゴリは削除できません。');
    });

    test('登録されている記録が存在しない場合はカテゴリを削除可能', () => {
        const category = Category.create('Books', categoryDuplicationCheckService);

        // 削除が許可されるべきなのでエラーは発生しない
        expect(() => category.delete()).not.toThrow();
    });
});
