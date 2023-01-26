import deepEqual from 'fast-deep-equal';

export type QueryStringArgs = string | (string | null)[] | null | undefined;

export type Values = string | number | Date | undefined;

export type Parser<V> = (value: QueryStringArgs) => V | undefined;

export type ArrayParser<V> = (parser: Parser<V>) => Parser<V[]>;

export const number: Parser<number> = (value: QueryStringArgs) => (
    Array.isArray(value)
        ? value[0] != null
            ? parseInt(value[0], 10)
            : undefined
        : value != null
            ? parseInt(value, 10)
            : value ?? undefined
);

export const string: Parser<string> = (value: QueryStringArgs) => (
    Array.isArray(value)
        ? value[0] != null
            ? value[0]
            : undefined
        : value ?? undefined
);

export const date: Parser<Date> = (value: QueryStringArgs) => (
    Array.isArray(value)
        ? value[0] != null
            ? new Date(value[0])
            : undefined
        : value != null
            ? new Date(value)
            : undefined
);

export const arrayOf: ArrayParser<Values> = (
    parser: Parser<Values>,
) => (value: QueryStringArgs) => (
    Array.isArray(value)
        // eslint-disable-next-line react/destructuring-assignment
        ? value.map((v) => parser(v)).filter((v) => v !== undefined)
        : value != null
            ? parser(value) != null ? [parser(value)] : undefined
            : undefined
);

export const deepCompare = (parser: ReturnType<ArrayParser<Values>>) => {
    let prev: ReturnType<ReturnType<ArrayParser<Values>>>;

    const wrappedParser = (value: QueryStringArgs) => {
        const result = parser(value);

        prev = deepEqual(prev, result) ? prev : result;

        return prev;
    };

    return wrappedParser;
};
