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

  return {
    open,
    isOpen,
    close,
    targetElement,
    setTargetElement,
  };
}

export default useDropdown;
