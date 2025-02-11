import { customAlphabet } from 'nanoid';

import { ValueObject } from '../../shared/valueObject';

const generateNumericId = customAlphabet('0123456789');
export class CategoryId extends ValueObject<string, 'CategoryId'> {
    constructor(value: string = generateNumericId()) {
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
