import { useCallback, useMemo } from 'react';
import { NavigateOptions, useNavigate, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { Values, Parser } from './parsers';

type ValueMap = Record<string, Values | Values[]>;

type ParserMap = Record<string, Parser<Values> | Parser<Values[]>>;

type ParseOptions = {
    search: Location['search'];
    keys: string[];
    parsers: ParserMap;
    defaultValues: ValueMap;
};

type Option<V> = {
    value?: V;
    parser: Parser<V>;
}

type Options = Record<string, Option<Values> | Option<Values[]>>;

const getDefaultValues = (options: Options) => Object.entries(options)
    .reduce((memo: ValueMap, [key, { value }]) => {
        memo[key] = value;
        return memo;
    }, {});

const getParsers = (options: Options) => Object.entries(options)
    .reduce((memo: ParserMap, [key, { parser }]) => {
        memo[key] = parser;
        return memo;
    }, {});

const parseQueryString = <T extends {}>({
    search,
    keys,
    parsers,
    defaultValues,
}: ParseOptions): T => {
    const query = qs.parse(search, { sort: false });

    return keys.reduce((memo: any, key) => {
        const parser = parsers[key];
        const value = query[key];
        const result = parser(value) ?? defaultValues[key];

        if (result !== undefined) {
            memo[key] = result;
        }

        return memo;
    }, {});
};

const useQueryString = <T extends {}>(
    options: Options,
    deps: ReadonlyArray<unknown> = [],
): [T, (update: T, config?: NavigateOptions) => void] => {
    const navigate = useNavigate();
    const { search } = useLocation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const keys = useMemo(() => Object.keys(options), deps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultValues = useMemo(() => getDefaultValues(options), deps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const parsers = useMemo(() => getParsers(options), deps);

    const data = useMemo(() => parseQueryString<T>({
        keys,
        parsers,
        defaultValues,
        search,
    }), [keys, defaultValues, parsers, search]);

    const updateQueryString = useCallback((update: T, navOptions?: NavigateOptions) => {
        const query = qs.stringify(Object.entries<Values>(update)
            .reduce((memo, [key, value]) => {
                if (value instanceof Date) {
                    memo[key] = value.toISOString();
                }
                else {
                    memo[key] = value;
                }

                return memo;
            }, {} as Record<string, Values>));

        navigate(`?${query}`, navOptions);
    }, [navigate]);

    return [data, updateQueryString];
};

export default useQueryString;
