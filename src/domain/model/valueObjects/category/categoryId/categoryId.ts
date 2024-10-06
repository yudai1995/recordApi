import { nanoid } from 'nanoid';
import { ValueObject } from '../../shared/valueObject';

export class CategoryId extends ValueObject<string, 'CategoryId'> {
    constructor(value: string = nanoid()) {
        super(value);
    }

    protected validate(categoryId: string): void {
        if (!categoryId) {
            throw new Error('カテゴリは必須です。');
        }
    }

    get value(): string {
        return this._value;
    }
}
