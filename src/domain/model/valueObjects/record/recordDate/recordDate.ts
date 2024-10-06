import { ValueObject } from '../../shared/valueObject';

export class RecordDate extends ValueObject<Date, 'RecordDate'> {
    constructor(value: Date) {
        super(value);
    }

    protected validate(date: Date): void {
        const today = new Date();
        if (date > today) {
            throw new Error('未来の日付は登録できません。');
        }
    }

    get value(): Date {
        return this._value;
    }

    public equals(other: RecordDate): boolean {
        return this._value.getTime() === other.value.getTime();
    }
}
