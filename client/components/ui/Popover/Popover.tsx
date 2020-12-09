import React, { useMemo, useState } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import Popper from '../Popper';

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

  const mergedPopperOptions = useMemo(
    () => ({
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
    }),
    [arrowElement, popperOptions]
  );

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
      <Popper
        isOpen={isOpen && !closed}
        targetElement={targetElement}
        className="popover"
        popperOptions={mergedPopperOptions}
      >
        {(arrowProps) => (
          <>
            <div
              {...arrowProps}
              ref={setArrowElement}
              className="popover-arrow"
            ></div>
            <div className="outline-none rounded-md shadow-sm p-2 text-xs leading-4 bg-gray-700 text-white">
              {content}
            </div>
          </>
        )}
      </Popper>
    </div>
  );
}

export default Popover;
