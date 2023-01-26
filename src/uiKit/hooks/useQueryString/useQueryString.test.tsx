import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, renderHook } from '@testing-library/react-hooks';
import {
    string, number, date, arrayOf,
} from './parsers';
import useQueryString from './useQueryString';

describe('useQueryString', () => {
    it('Syncs state with location search', async () => {
        const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

        const { result } = renderHook(() => useQueryString<{name: string; age: number}>({
            name: { value: 'Skywalker', parser: string },
            age: { value: 0, parser: number },
        }), { wrapper });

        // creates correct initial state
        expect(result.current[0]).toEqual({ name: 'Skywalker', age: 0 });

        // updates state and location.search
        act(() => {
            result.current[1]({ name: 'Vader', age: 23 });
        });
        expect(result.current[0]).toEqual({ name: 'Vader', age: 23 });
        expect(window.location.search).toBe('?age=23&name=Vader');

        // TODO: find out way to test it
        // reacts on location.search change
        /* act(() => {
            navigate('?age=45&name=null');
        });

        expect(result.current[0]).toEqual({ name: 'null', age: 45 }); */
    });

    it('Works with all primitive types and arrays', () => {
        const wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
        const { result } = renderHook(() => useQueryString<{
            n: number;
            s: string;
            d: Date;
            an: number[];
            as: string[];
            ad: Date[];
        }>({
            n: { value: 0, parser: number },
            s: { value: 'a', parser: string },
            d: { value: new Date('2020-01-01T00:00:00.000Z'), parser: date },
            an: { value: [0, 1], parser: arrayOf(number) },
            as: { value: ['a', 'b'], parser: arrayOf(string) },
            ad: {
                value: [new Date('2020-01-01T00:00:00.000Z'), new Date('2020-01-01T00:00:00.000Z')],
                parser: arrayOf(date),
            },
        }), { wrapper });

        // creates correct initial state
        expect(result.current[0]).toEqual({
            n: 0,
            s: 'a',
            d: new Date('2020-01-01T00:00:00.000Z'),
            an: [0, 1],
            as: ['a', 'b'],
            ad: [new Date('2020-01-01T00:00:00.000Z'), new Date('2020-01-01T00:00:00.000Z')],
        });
    });
});
