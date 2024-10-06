import { Title } from './title';

describe('タイトルの値オブジェクトのテスト', () => {
    test('equals', () => {
        const title1 = new Title('朝のニュース');
        const title2 = new Title('朝のニュース');
        const title3 = new Title('夜のニュース');
        expect(title1.equals(title2)).toBeTruthy();
        expect(title1.equals(title3)).toBeFalsy();
    });

    test('MIN未満の値でTitleを生成するとバリデーションエラー', () => {
        expect(() => {
            new Title('');
        }).toThrow(`タイトルは${Title.MIN}文字以上、${Title.MAX}文字以下でなければなりません。`);
    });

    test('MAX以上の値でTitleを生成するとバリデーションエラー', () => {
        expect(() => {
            new Title('a'.repeat(513));
        }).toThrow(`タイトルは${Title.MIN}文字以上、${Title.MAX}文字以下でなければなりません。`);
    });
});
