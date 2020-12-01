import { Transition } from '@headlessui/react';
import React, { useEffect } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import { Portal } from 'react-portal';
import usePopper from '../../../utils/hooks/usePopper';
import classNames from '../../../utils/classNames';

interface Props extends Partial<PopperOptions> {
  targetElement: Element | null;
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
  autoClose?: boolean;
  className?: string;
}

function Dropdown({
  children,
  targetElement,
  isOpen,
  close,
  autoClose = true,
  className,
  ...popperOptions
}: Props) {
  const [popperProps, setPopperElement, popperElement] = usePopper(
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
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-750"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={setPopperElement} {...popperProps}>
            <div
              ref={ref}
              className={classNames(
                'outline-none overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg',
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
