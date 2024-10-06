import { CategoryName } from './categoryName';

describe('カテゴリ名の値オブジェクトのテスト', () => {
    test('equals', () => {
        const categoryName1 = new CategoryName('テレビ');
        const categoryName2 = new CategoryName('テレビ');
        const categoryName3 = new CategoryName('ラジオ');
        expect(categoryName1.equals(categoryName2)).toBeTruthy();
        expect(categoryName1.equals(categoryName3)).toBeFalsy();
    });

    test('MIN未満の値でCategoryNameを生成するとバリデーションエラー', () => {
        expect(() => {
            new CategoryName('');
        }).toThrow(`カテゴリ名は${CategoryName.MIN}文字以上、${CategoryName.MAX}文字以下でなければなりません。`);
    });

    test('MAX以上の値でCategoryNameを生成するとバリデーションエラー', () => {
        expect(() => {
            new CategoryName('a'.repeat(51));
        }).toThrow(`カテゴリ名は${CategoryName.MIN}文字以上、${CategoryName.MAX}文字以下でなければなりません。`);
    });
});
