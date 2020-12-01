import { useEffect } from 'react';

export interface KeyHandlers {
  [key: string]: () => void;
}

export interface CommandKeyHandlers {
  _?: KeyHandlers;
  ctrl?: KeyHandlers;
}

function useKeyCommands<T extends HTMLElement | Document>(
  handlers: CommandKeyHandlers,
  element?: T | null
) {
  useEffect(() => {
    if (!element) {
      return;
    }

    const handleKeyDown = (evt: Event) => {
      const e = evt as KeyboardEvent;
      const handler =
        handlers._?.[e.key] ?? (e.ctrlKey && handlers.ctrl?.[e.key]);

      if (handler) {
        handler();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [element, handlers]);
}

export default useKeyCommands;
