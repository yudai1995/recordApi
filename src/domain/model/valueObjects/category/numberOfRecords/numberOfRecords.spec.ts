import { NumberOfRecords } from './numberOfRecords';

describe('NumberOfRecords', () => {
    test('許容される範囲内の在庫数を設定できる', () => {
        const validNumberOfRecords = 500;
        const quantity = new NumberOfRecords(validNumberOfRecords);
        expect(quantity.value).toBe(validNumberOfRecords);
    });

    test('MIN未満の値でNumberOfRecordsを生成するとエラーを投げる', () => {
        const lessThanMin = NumberOfRecords.MIN - 1;
        expect(() => new NumberOfRecords(lessThanMin)).toThrow('レコード数は0以上です。');
    });

    describe('increment', () => {
        test('正の数を加算すると、在庫数が増加する', () => {
            const initialQuantity = new NumberOfRecords(10);
            const incrementAmount = 5;
            const newQuantity = initialQuantity.increase(incrementAmount);

            expect(newQuantity.value).toBe(15);
        });
    });

    describe('decrement', () => {
        test('正の数を減算すると、在庫数が減少する', () => {
            const initialQuantity = new NumberOfRecords(10);
            const decrementAmount = 5;
            const newQuantity = initialQuantity.decrement(decrementAmount);

            expect(newQuantity.value).toBe(5);
        });

        test('負の数に減算しようとするとエラーが発生する', () => {
            const initialQuantity = new NumberOfRecords(0);
            const decrementAmount = 1;

            expect(() => initialQuantity.decrement(decrementAmount)).toThrow('レコード数は0以上です。');
        });
    });
});
