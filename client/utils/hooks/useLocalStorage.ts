import { useCallback, useMemo } from 'react';

type Getter<T> = (prev?: T) => T;

function useLocalStorage() {
  const get = useCallback(<T>(key: string): T | undefined => {
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : undefined;
  }, []);

  const set = useCallback(
    <T>(key: string, item: T | Getter<T>) => {
      localStorage.setItem(
        key,
        typeof item === 'function'
          ? JSON.stringify((item as Getter<T>)(get(key)))
          : JSON.stringify(item)
      );
    },
    [get]
  );

  const remove = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return useMemo(() => ({ set, get, remove }), [get, remove, set]);
}

export default useLocalStorage;
