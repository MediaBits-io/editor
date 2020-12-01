import { useState } from 'react';

function useDropdownSelect() {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  return {
    targetElement,
    setTargetElement,
  };
}

export default useDropdownSelect;
