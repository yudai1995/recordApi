import { Id } from './id';

describe('Idの値オブジェクトのテスト', () => {
    test('equals', () => {
        const Id1 = new Id('9784167158057');
        const Id2 = new Id('9784167158057');
        const Id3 = new Id('9781234567890');
        expect(Id1.equals(Id2)).toBeTruthy();
        expect(Id1.equals(Id3)).toBeFalsy();
    });
});
