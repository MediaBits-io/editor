import { Menu, Transition } from '@headlessui/react';
import React from 'react';
import { Portal } from 'react-portal';
import { Options as PopperOptions } from '@popperjs/core';
import classNames from '../../../utils/classNames';
import usePopper from '../../../utils/hooks/usePopper';

interface Props extends Partial<PopperOptions> {
  className?: string;
  targetElement: Element | null;
  target: React.ReactNode | ((props: { open: boolean }) => React.ReactNode);
  children: React.ReactNode;
}

function DropdownMenu({
  className,
  children,
  targetElement,
  target,
  ...popperOptions
}: Props) {
  const [popperProps, popperElement] = usePopper(targetElement, popperOptions);

  return (
    <Menu>
      {(props) => (
        <>
          {typeof target == 'function' ? target(props) : target}

          <Portal>
            <Transition
              show={props.open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {(ref) => (
                <div ref={popperElement} {...popperProps}>
                  <div ref={ref}>
                    <Menu.Items
                      className={classNames(
                        'outline-none overflow-hidden bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg',
                        className
                      )}
                    >
                      {children}
                    </Menu.Items>
                  </div>
                </div>
              )}
            </Transition>
          </Portal>
        </>
      )}
    </Menu>
  );
}

export default DropdownMenu;
