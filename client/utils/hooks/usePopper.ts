import { useState } from 'react';
import { usePopper as useReactPopper } from 'react-popper';
import { Options } from '@popperjs/core';

interface PopperProps {
  [key: string]: string | React.CSSProperties;
  style: React.CSSProperties;
}

export default function usePopper(
  targetElement: Element | null,
  options: Partial<Options>
): [PopperProps, (el: HTMLElement | null) => void, HTMLElement | null] {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = useReactPopper(targetElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    ...options,
  });

  return [
    { style: styles.popper, ...attributes.popper },
    setPopperElement,
    popperElement,
  ];
}
