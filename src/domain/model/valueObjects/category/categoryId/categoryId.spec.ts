import { CategoryId } from './categoryid';

describe('カテゴリIDの値オブジェクトのテスト', () => {
    test('equals', () => {
        const categoryid1 = new CategoryId('1');
        const categoryid2 = new CategoryId('1');
        const categoryid3 = new CategoryId('2');
        expect(categoryid1.equals(categoryid2)).toBeTruthy();
        expect(categoryid1.equals(categoryid3)).toBeFalsy();
    });

    test('未選択の場合はバリデーションエラー', () => {
        expect(() => {
            new CategoryId('');
        }).toThrow('カテゴリは必須です。');
    });
});
