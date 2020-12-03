import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import { Portal } from 'react-portal';
import usePopper from '../../../utils/hooks/usePopper';

interface Props extends Partial<PopperOptions> {
  children: React.ReactNode;
  content: React.ReactNode;
  closed?: boolean;
  className?: string;
}

function Popover({
  children,
  content,
  className,
  closed,
  ...popperOptions
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(
    null
  );
  const [{ popperProps, arrowProps }, setPopperElement] = usePopper(
    targetElement,
    {
      ...popperOptions,
      modifiers: [
        ...(popperOptions?.modifiers ?? []),
        {
          name: 'arrow',
          options: {
            element: arrowElement,
            padding: 5,
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (closed && isOpen) {
      setOpen(false);
    }
  }, [closed, isOpen]);

  return (
    <div
      ref={setTargetElement}
      className={className}
      onMouseOver={() => {
        if (!isOpen && !closed) {
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
          show={isOpen && !closed}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          {(ref) => (
            <div className="popover" ref={setPopperElement} {...popperProps}>
              <div ref={ref}>
                <div
                  ref={setArrowElement}
                  {...arrowProps}
                  className="popover-arrow"
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
