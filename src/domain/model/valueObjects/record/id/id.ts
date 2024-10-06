import { customAlphabet } from 'nanoid';
import { ValueObject } from '../../shared/valueObject';

export class Id extends ValueObject<string, 'Id'> {
    constructor(value: string = customAlphabet('0123456789', 5)()) {
        super(value);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected validate(id: string): void {
        // Todo: バリデーション
    }

    get value(): string {
        return this._value;
    }
}
