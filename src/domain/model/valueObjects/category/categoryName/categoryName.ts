import { ValueObject } from '../../shared/valueObject';

export class CategoryName extends ValueObject<string, 'CategoryName'> {
    static readonly MAX = 50;
    static readonly MIN = 1;

    constructor(value: string) {
        super(value);
    }

    protected validate(categoryName: string): void {
        if (categoryName.length < CategoryName.MIN || categoryName.length > CategoryName.MAX) {
            throw new Error(
                `カテゴリ名は${CategoryName.MIN}文字以上、${CategoryName.MAX}文字以下でなければなりません。`,
            );
        }
    }

    get value(): string {
        return this._value;
    }
}
