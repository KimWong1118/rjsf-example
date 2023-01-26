import { renderHook } from '@testing-library/react-hooks';
import useDidUpdateEffect from './useDidUpdateEffect';

describe('useDidUpdateEffect', () => {
    it('Invokes callback on did update', () => {
        const callback = jest.fn();
        let deps = [1, 1];
        const { rerender } = renderHook(() => useDidUpdateEffect(callback, deps));

        // does not invoke callback on did mount
        expect(callback).toHaveBeenCalledTimes(0);
        callback.mockClear();

        // invokes callback if deps are changed
        deps = [1, 2];
        rerender();
        expect(callback).toHaveBeenCalledTimes(1);
        callback.mockClear();

        // does not invoke callback if deps are not changed
        rerender();
        expect(callback).toHaveBeenCalledTimes(0);
        callback.mockClear();
    });
});
