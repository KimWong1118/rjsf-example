import { useEffect, useState } from 'react';

const readValue = <T>(key: string, initialValue: T) => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to read localStorage key "${key}":`, error);
        return initialValue;
    }
};

const writeValue = <T>(key: string, value: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to write localStorage key "${key}":`, error);
    }
};

const useLocalStorage = <T>(
    key: string,
    initialValue: T,
): [T, (value: T | ((value: T) => T)) => void] => {
    const [storedValue, setStoredValue] = useState<T>(() => readValue(key, initialValue));

    const setValue = (value: T | ((value: T) => T)) => {
        const update = value instanceof Function ? value(storedValue) : value;
        writeValue(key, update);
        setStoredValue(update);
    };

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue(key, initialValue));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
};

export default useLocalStorage;
