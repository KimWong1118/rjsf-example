import { useEffect, useRef } from 'react';

const usePreviousDefinedValue = <T>(value: T | undefined) => {
    const ref = useRef<T | undefined>();

    useEffect(() => {
        if (value !== undefined) {
            ref.current = value;
        }
    }, [value]);

    return value ?? ref.current;
};

export default usePreviousDefinedValue;
