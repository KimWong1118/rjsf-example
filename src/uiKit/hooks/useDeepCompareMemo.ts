import { useRef } from 'react';
import deepEqual from 'fast-deep-equal';

const useDeepCompareMemoize = (value: any) => {
    const ref = useRef();

    if (!deepEqual(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
};

export default useDeepCompareMemoize;
