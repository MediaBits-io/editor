import { useCallback, useEffect } from 'react';

export default function useEditorKeyCommand<T extends HTMLElement | Document>(
  command: string,
  handler: () => void,
  element?: T
) {
  const handleKeyDown = useCallback(
    (evt: Event | React.KeyboardEvent) => {
      const e = evt as KeyboardEvent;
      const isCtrlDown = e.metaKey || e.ctrlKey;
      const isShiftDown = e.shiftKey;
      const keys = command.split('+');

      const triggered =
        keys.includes(e.key.toLowerCase().replace(/ctrl|shift/, '')) &&
        keys.includes('ctrl') === isCtrlDown &&
        keys.includes('shift') === isShiftDown;

      if (triggered) {
        handler();
        evt.preventDefault();
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
