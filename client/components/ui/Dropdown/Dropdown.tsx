import React, { useEffect, useRef } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import classNames from '../../../utils/classNames';
import Popper from '../Popper';

export interface Props extends Partial<PopperOptions> {
  targetElement: HTMLElement | null;
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  autoClose?: boolean;
  className?: string;
  wrapperClass?: string;
  transitionClass?: [string, string];
}

function Dropdown({
  children,
  targetElement,
  isOpen,
  close,
  autoClose = true,
  transitionClass = ['scale-95', 'scale-100'],
  wrapperClass,
  className,
  ...popperOptions
}: Props) {
  const containerElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !targetElement?.contains(target) &&
        (!containerElRef.current?.contains(target) || autoClose)
      ) {
        close();
      }
    };

    if (process.browser) {
      document.addEventListener('click', handler);

      return () => {
        document.removeEventListener('click', handler);
      };
    }
  }, [autoClose, close, isOpen, targetElement]);

  return (
    <Popper
      isOpen={isOpen}
      targetElement={targetElement}
      popperOptions={popperOptions}
      className={wrapperClass}
    >
      <div
        ref={containerElRef}
        className={classNames(
          'outline-none overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg',
          className
        )}
      >
        {children}
      </div>
    </Popper>
  );
}

export default Dropdown;
