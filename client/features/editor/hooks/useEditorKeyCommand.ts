import { useCallback, useEffect } from 'react';

export default function useEditorKeyCommand<T extends HTMLElement | Document>(
  command: string,
  handler: () => void,
  element?: T
) {
  const handleKeyDown = useCallback(
    (evt: Event | React.KeyboardEvent) => {
      const e = evt as KeyboardEvent;
      const keys = command.split('+');

      const triggered = keys.every((key) => {
        switch (key) {
          case 'shift':
            return e.shiftKey;
          case 'ctrl':
            return e.metaKey || e.ctrlKey;
          default:
            return key === e.key.toLowerCase();
        }
      });

      if (triggered) {
        handler();
      }
    },
    [command, handler]
  );

  useEffect(() => {
    if (!element) {
      return;
    }

    element.addEventListener('keydown', handleKeyDown);
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [element, handleKeyDown]);

  return handleKeyDown;
}
