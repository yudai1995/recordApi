import { LastUpdate } from './lastUpdate';

describe('記録日時の値オブジェクトのテスト', () => {
    test('equals', () => {
        const recorddate1 = new LastUpdate(new Date('2020/01/01'));
        const recorddate2 = new LastUpdate(new Date('2020/01/01'));
        const recorddate3 = new LastUpdate(new Date('2020/01/11'));

        expect(recorddate1.equals(recorddate2)).toBeTruthy();
        expect(recorddate1.equals(recorddate3)).toBeFalsy();
    });

    test('未来の日付でLastUpdateを生成するとバリデーションエラー', () => {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

        expect(() => {
            new LastUpdate(tomorrow);
        }).toThrow('未来の日付は登録できません。');
    });
});
