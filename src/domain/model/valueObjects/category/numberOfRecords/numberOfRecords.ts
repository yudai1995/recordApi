import { ValueObject } from '../../shared/valueObject';

export class NumberOfRecords extends ValueObject<number, 'NumberOfRecords'> {
    static readonly MIN = 0;

    constructor(value: number) {
        super(value);
    }

    protected validate(value: number): void {
        if (value < NumberOfRecords.MIN) {
            throw new Error('レコード数は0以上です。');
        }
    }

    increase(amount = 1): NumberOfRecords {
        const newValue = this._value + amount;

        return new NumberOfRecords(newValue);
    }

    decrement(amount = 1): NumberOfRecords {
        const newValue = this._value - amount;

        return new NumberOfRecords(newValue);
    }
}
