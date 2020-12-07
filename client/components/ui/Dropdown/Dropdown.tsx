import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import { Portal } from 'react-portal';
import usePopper from '../../../utils/hooks/usePopper';
import classNames from '../../../utils/classNames';

export interface Props extends Partial<PopperOptions> {
  targetElement: Element | null;
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  autoClose?: boolean;
  className?: string;
  transitionClass?: [string, string];
}

function Dropdown({
  children,
  targetElement,
  isOpen,
  close,
  autoClose = true,
  transitionClass = ['scale-95', 'scale-100'],
  className,
  ...popperOptions
}: Props) {
  const [{ popperProps }, setPopperElement, popperElement] = usePopper(
    targetElement,
    popperOptions
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handler = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !targetElement?.contains(target) &&
        (!popperElement?.contains(target) || autoClose)
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
  }, [autoClose, close, isOpen, popperElement, targetElement]);

  return (
    <Portal>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom={classNames('transform opacity-0', transitionClass[0])}
        enterTo={classNames('transform opacity-100', transitionClass[1])}
        leave="transition ease-in duration-100"
        leaveFrom={classNames('transform opacity-100', transitionClass[1])}
        leaveTo={classNames('transform opacity-0', transitionClass[0])}
      >
        {(ref) => (
          <div ref={setPopperElement} {...popperProps}>
            <div
              ref={ref}
              className={classNames(
                'outline-none overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg',
                className
              )}
            >
              {children}
            </div>
          </div>
        )}
      </Transition>
    </Portal>
  );
}

export default Dropdown;
