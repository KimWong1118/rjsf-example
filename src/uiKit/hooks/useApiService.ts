import {
    Dispatch,
    SetStateAction,
    MutableRefObject,
    useRef,
    useState,
    useCallback,
    useMemo,
} from 'react';
import produce, { Draft } from 'immer';
import axios, { AxiosResponse, CancelToken as CancelTokenAlias } from 'axios';

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
type IsAny<T> = IfAny<T, true, never>;
type ReplaceAnyWithUnknown<T> = true extends IsAny<T> ? unknown : T;

type Service = (...args: any[]) => Promise<AxiosResponse<any>>;
type UnpackedService<S> = S extends (...args: any[]) => Promise<AxiosResponse<infer D>>
    ? D
    : never;
type UnpackedDispatcher<D> = D extends Dispatch<SetStateAction<infer S>> ? S : never;

type Options<D, Params extends unknown[]> = {
    onCompleted?: (data: D, requestParams: Params) => void;
    onError?: (error: Error, requestParams: Params) => void;
};

type ApiServiceResult<Params extends unknown[], D> = [
    (...args: Params) => Promise<void>,
    {
        loading: boolean;
        data?: D;
        error?: Error;
        update: (recipe?: D | ((d: Draft<D>) => void)) => void;
    },
];

const idGenerator = () => {
    let id = 0;
    // eslint-disable-next-line no-return-assign
    return () => id += 1;
};

const wrapDispatcher = <D extends Dispatch<SetStateAction<any>>, S = UnpackedDispatcher<D>>(
    requestIdRef: MutableRefObject<number | null>,
    dispatcher: D,
) => (id: number, state: S) => {
    if (requestIdRef.current === id) {
        dispatcher(state);
    }
};

const MEMOIZED_EMPTY_OBJECT = {};

const isArray = <S extends Service, Ctx>(
    test: S | [Ctx, S],
): test is [Ctx, S] => Array.isArray(test);

const useApiService = <S extends Service, D = ReplaceAnyWithUnknown<UnpackedService<S>>, Ctx = {}>(
    service: S | [Ctx, S],
    options: Options<D, Parameters<S>> = MEMOIZED_EMPTY_OBJECT,
): ApiServiceResult<Parameters<S>, D> => {
    // uniform service
    const s = isArray(service) ? service[1] : service;
    const ctx = isArray(service) ? service[0] : undefined;

    // refs for request id generator and latests request id storage
    const idGeneratorRef = useRef(idGenerator());
    const latestRequestIdRef = useRef<number | null>(null);

    // latest request state
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<D | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    // action for updating cached data
    const update = useCallback((recipe?: D | ((d: Draft<D>) => void)) => {
        if (recipe instanceof Function) {
            const nextState = produce<D>(recipe);
            setData(nextState);
        }
        else {
            setData(recipe);
        }
    }, []);

    // wrapped dispatchers processing latest requests only
    const wrappedSetLoading = useMemo(() => wrapDispatcher(latestRequestIdRef, setLoading), []);
    const wrappedSetData = useMemo(() => wrapDispatcher(latestRequestIdRef, setData), []);
    const wrappedSetError = useMemo(() => wrapDispatcher(latestRequestIdRef, setError), []);

    // api service
    const callApi = useCallback(async (...params: Parameters<S>) => {
        const { onCompleted, onError } = options;
        const requestId = idGeneratorRef.current();
        latestRequestIdRef.current = requestId;

        try {
            wrappedSetLoading(requestId, true);
            wrappedSetData(requestId, undefined);
            wrappedSetError(requestId, undefined);

            const response = await s.call(ctx, ...params);

            wrappedSetData(requestId, response.data);
            onCompleted?.(response.data, params);
        }
        catch (err) {
            if (err instanceof Error) {
                if (!axios.isCancel(err)) {
                    wrappedSetError(requestId, err);
                    onError?.(err, params);
                }
            }
        }
        finally {
            wrappedSetLoading(requestId, false);
        }
    }, [
        ctx,
        s,
        options,
        wrappedSetLoading,
        wrappedSetData,
        wrappedSetError,
    ]);

    return [callApi, {
        loading, data, error, update,
    }];
};

export type CancelToken = CancelTokenAlias;
export const { source: CancelTokenSource } = axios.CancelToken;

export default useApiService;
