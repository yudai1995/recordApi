import { ValueObject } from '../shared/valueObject';

export class LastUpdate extends ValueObject<Date, 'LastUpdate'> {
    constructor(value: Date) {
        super(value);
    }

    protected validate(lastUpdate: Date): void {
        const today = new Date();
        if (lastUpdate > today) {
            throw new Error('未来の日付は登録できません。');
        }
    }

    get value(): Date {
        return this._value;
    }

    public equals(other: LastUpdate): boolean {
        return this._value.getTime() === other.value.getTime();
    }
}
