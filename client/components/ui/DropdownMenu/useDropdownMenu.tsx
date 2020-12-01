import { useState } from 'react';

function useDropdownMenu() {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  return {
    targetElement,
    setTargetElement,
  };
}

export default useDropdownMenu;
