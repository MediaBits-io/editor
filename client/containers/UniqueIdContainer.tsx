import { createContainer } from 'unstated-next';
import { useCallback, useRef } from 'react';

function useUniqueId() {
  const countersRef = useRef(new Map<string, number>());

  const getUniqueId = useCallback((key: string) => {
    const index = countersRef.current.get(key) ?? 1;
    countersRef.current.set(key, index + 1);
    return `${key}-${index}`;
  }, []);

  return { getUniqueId };
}

const UniqueIdContainer = createContainer(useUniqueId);

export default UniqueIdContainer;
