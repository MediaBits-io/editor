import { useCallback, useState } from 'react';

function useDropdown() {
  const [isOpen, setOpen] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  const open = useCallback(() => {
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggle = useCallback(() => (isOpen ? close() : open()), [
    close,
    isOpen,
    open,
  ]);

  return {
    open,
    isOpen,
    close,
    toggle,
    targetElement,
    setTargetElement,
  };
}

export default useDropdown;
