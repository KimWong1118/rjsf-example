import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from './useToggle';

describe('useToggle', () => {
    it('Has correct initial value', () => {
        const { result: { current: [value] } } = renderHook(() => useToggle(true));
        expect(value).toEqual(true);
    });

    it('Toggles value', () => {
        const { result } = renderHook(() => useToggle(false));
        act(() => {
            const [, toggle] = result.current;
            toggle();
        });
        const [value] = result.current;
        expect(value).toEqual(true);
    });
});
