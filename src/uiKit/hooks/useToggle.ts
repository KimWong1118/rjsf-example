import {
    useState,
    useCallback,
    useDebugValue,
} from 'react';

const useToggle = (initialState = false): [boolean, () => void] => {
    const [state, setState] = useState<boolean>(initialState);
    const toggle = useCallback(() => setState((value) => !value), []);
    useDebugValue(state);
    return [state, toggle];
};

export default useToggle;
