import { Transition } from '@headlessui/react';
import React, { useRef, useState } from 'react';
import { Portal } from 'react-portal';
import { Options as PopperOptions } from '@popperjs/core';
import { usePopper } from 'react-popper';
import classNames from '../../utils/classNames';

interface Props {
  targetElement: HTMLElement | null;
  children:
    | React.ReactNode
    | ((arrowProps: { style: React.CSSProperties }) => React.ReactNode);
  isOpen: boolean;
  className?: string;
  transitionClass?: [string, string];
  transitionActiveClass?: [string, string];
  popperOptions?: Partial<PopperOptions>;
}

function Popper({
  children,
  isOpen,
  className,
  targetElement,
  popperOptions,
  transitionActiveClass = ['scale-95', 'scale-100'],
  transitionClass = ['duration-100', 'duration-75'],
}: Props) {
  const popperElRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(targetElement, popperElement, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
    ...popperOptions,
  });

  return (
    <Portal>
      <div
        className={className}
        ref={popperElRef}
        style={styles.popper}
        {...attributes.popper}
      >
        <Transition
          show={isOpen}
          enter={classNames('transition ease-out', transitionClass[0])}
          enterFrom={classNames(
            'transform opacity-0',
            transitionActiveClass[0]
          )}
          enterTo={classNames(
            'transform opacity-100',
            transitionActiveClass[1]
          )}
          leave={classNames('transition ease-in', transitionClass[1])}
          leaveFrom={classNames(
            'transform opacity-100',
            transitionActiveClass[1]
          )}
          leaveTo={classNames('transform opacity-0', transitionActiveClass[0])}
          beforeEnter={() => setPopperElement(popperElRef.current)}
          afterLeave={() => setPopperElement(null)}
        >
          {typeof children === 'function'
            ? children({ style: styles.arrow })
            : children}
        </Transition>
      </div>
    </Portal>
  );
}

export default Popper;
