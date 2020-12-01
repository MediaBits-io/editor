import { useRef, useCallback } from 'react';

function useThrottle<A extends any[]>(
  fn: (...args: A) => void,
  cooldown: number
) {
  const cooldownRef = useRef<any>();
  const lastArgsRef = useRef<A>();

  const run = useCallback(
    (...args: A) => {
      if (!cooldownRef.current) {
        fn(...args);

        cooldownRef.current = setTimeout(() => {
          cooldownRef.current = undefined;
          if (lastArgsRef.current) {
            const fnArgs = lastArgsRef.current;
            lastArgsRef.current = undefined;
            run(...fnArgs);
          }
        }, cooldown);
      } else {
        lastArgsRef.current = args;
      }
    },
    [cooldown, fn]
  );

  return run;
}

export default useThrottle;
