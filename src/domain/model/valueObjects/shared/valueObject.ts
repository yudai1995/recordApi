export abstract class ValueObject<T, U> {
    private _type: U;
    protected readonly _value: T;

    constructor(value: T) {
        this.validate(value);
        this._value = value;
    }

    protected abstract validate(value: T): void;

    get value(): T {
        return this._value;
    }

    equals(other: ValueObject<T, U>): boolean {
        return other._value === this._value;
    }
}
