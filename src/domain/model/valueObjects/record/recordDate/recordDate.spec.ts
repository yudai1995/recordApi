import { RecordDate } from './RecordDate';

describe('記録日時の値オブジェクトのテスト', () => {
    test('equals', () => {
        const recorddate1 = new RecordDate(new Date('2020/01/01'));
        const recorddate2 = new RecordDate(new Date('2020/01/01'));
        const recorddate3 = new RecordDate(new Date('2020/01/11'));
        expect(recorddate1.equals(recorddate2)).toBeTruthy();
        expect(recorddate1.equals(recorddate3)).toBeFalsy();
    });

    test('未来の日付でRecordDateを生成するとバリデーションエラー', () => {
        const today = new Date();
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

        expect(() => {
            new RecordDate(tomorrow);
        }).toThrow('未来の日付は登録できません。');
    });
});
