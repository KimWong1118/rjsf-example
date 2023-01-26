import { DependencyList, useEffect, useRef } from 'react';

const useDidUpdateEffect = (fn: Function, inputs: DependencyList) => {
    const didMountRef = useRef(false);

    useEffect(() => {
        if (didMountRef.current) {
            fn();
        }
        else {
            didMountRef.current = true;
        }
    // invokes callback when inputs are changed; ignore eslint warning
    // eslint-disable-next-line
    }, inputs);
};

export default useDidUpdateEffect;
