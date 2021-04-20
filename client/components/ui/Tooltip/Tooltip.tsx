import React, { useRef, useState } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import Popper from '../Popper';

interface Props extends Partial<PopperOptions> {
  children: React.ReactNode;
  content: React.ReactNode;
  closed?: boolean;
  className?: string;
}

function Tooltip({
  children,
  content,
  className,
  closed,
  ...popperOptions
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const targetElRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={targetElRef}
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
        hasArrow
        isOpen={isOpen && !closed}
        targetElement={targetElRef.current}
        className="tooltip"
        popperOptions={{
          ...popperOptions,
          modifiers: popperOptions.modifiers ?? [
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
          ],
        }}
      >
        {(arrowProps) => (
          <div className="m-0.5">
            <div {...arrowProps} className="tooltip-arrow" />
            <div className="outline-none rounded-md shadow-sm p-2 text-xs leading-4 bg-gray-700 text-white">
              {content}
            </div>
          </div>
        )}
      </Popper>
    </div>
  );
}

export default Tooltip;
