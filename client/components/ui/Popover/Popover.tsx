import { Transition } from '@headlessui/react';
import React, { useState } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import { Portal } from 'react-portal';
import usePopper from '../../../utils/hooks/usePopper';

interface Props extends Partial<PopperOptions> {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

function Popover({ children, content, className, ...popperOptions }: Props) {
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );
  const [{ popperProps, arrowProps }, setPopperElement] = usePopper(
    targetElement,
    {
      modifiers: [
        {
          name: 'arrow',
          options: {
            element: arrowElement,
            padding: 5,
          },
        },
      ],
      ...popperOptions,
    }
  );

  return (
    <div
      ref={setTargetElement}
      className={className}
      onMouseOver={() => {
        if (!isOpen) {
          setOpen(true);
        }
      }}
      onMouseLeave={() => {
        if (isOpen) {
          setOpen(false);
        }
      }}
    >
      {children}
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
              <div className="mt-2" ref={ref}>
                <div
                  ref={setArrowElement}
                  {...arrowProps}
                  className="popover-arrow w-2 h-2 -mt-1"
                ></div>
                <div className="outline-none rounded-md shadow-sm p-2 text-xs leading-4 bg-gray-700 text-white">
                  {content}
                </div>
              </div>
            </div>
          )}
        </Transition>
      </Portal>
    </div>
  );
}

export default Popover;
