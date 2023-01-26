import { renderHook } from '@testing-library/react-hooks';
import useDeepCompareMemo from './useDeepCompareMemo';

describe('useDeepCompareMemo', () => {
    it('Memoize value if next value is deep equal to previous', () => {
        const value = { a: { b: { c: 'd' } } };
        const sameValueByReference = value;
        const sameValueByValue = { ...value };
        const anotherValue = { a: { b: { c: 'e' } } };

        const { result, rerender } = renderHook((props) => useDeepCompareMemo(props), {
            initialProps: value,
        });

        // same value
        expect(result.current).toEqual(value);

        // same reference
        rerender(sameValueByReference);
        expect(result.current).toEqual(value);

        // another reference, same value
        rerender(sameValueByValue);
        expect(result.current).toEqual(value);

        // another value
        rerender(anotherValue);
        expect(result.current).toEqual(anotherValue);
    });
});
