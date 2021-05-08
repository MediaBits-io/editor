import React, { useRef, useState } from 'react';
import { Options as PopperOptions } from '@popperjs/core';
import Popper from '../Popper';

interface Props extends Partial<PopperOptions> {
  children: React.ReactNode;
  content: React.ReactNode;
  closed?: boolean;
  className?: string;
  delay?: number;
}

function Tooltip({
  children,
  content,
  className,
  closed,
  placement = 'top',
  delay = 300,
  ...popperOptions
}: Props) {
  const [isOpen, setOpen] = useState(false);
  const targetElRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<any>();

  return (
    <div
      ref={targetElRef}
      className={className}
      onMouseOver={() => {
        if (!isOpen && !closed && !timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            setOpen(true);
          }, delay);
        }
      }}
      onMouseLeave={() => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
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
        className="tooltip z-20"
        popperOptions={{
          ...popperOptions,
          placement,
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
