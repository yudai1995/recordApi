import { ValueObject } from '../../shared/valueObject';

export class Title extends ValueObject<string, 'Title'> {
    static readonly MAX = 512;
    static readonly MIN = 1;

    constructor(value: string) {
        super(value);
    }

    protected validate(title: string): void {
        if (title.length < Title.MIN || title.length > Title.MAX) {
            throw new Error(`タイトルは${Title.MIN}文字以上、${Title.MAX}文字以下でなければなりません。`);
        }
    }

    get value(): string {
        return this._value;
    }
}
