import { Listbox, Transition } from '@headlessui/react';
import React from 'react';
import { Portal } from 'react-portal';
import { Options as PopperOptions } from '@popperjs/core';
import usePopper from '../../../utils/hooks/usePopper';

interface Props<Value> extends Partial<PopperOptions> {
  targetElement: Element | null;
  target: React.ReactNode | ((props: { open: boolean }) => React.ReactNode);
  children: React.ReactNode;
  value: Value;
  onChange: (value: Value) => void;
}

// TODO: dropdown is not animating out
function DropdownSelect<Value>({
  children,
  targetElement,
  target,
  value,
  onChange,
  ...popperOptions
}: Props<Value>) {
  const [popperProps, popperElement] = usePopper(targetElement, popperOptions);

  return (
    <Listbox value={value} onChange={onChange}>
      {(props) => (
        <>
          {typeof target == 'function' ? target(props) : target}

          <Portal>
            <Transition
              show={props.open}
              enter="transition transform ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              {(ref) => (
                <div ref={popperElement} {...popperProps}>
                  <div
                    ref={ref}
                    className="rounded-md transform opacity-0 scale-95 bg-white border border-gray-200 overflow-hidden shadow-lg"
                  >
                    <Listbox.Options className="max-h-64 py-1 text-base leading-6 overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                      {children}
                    </Listbox.Options>
                  </div>
                </div>
              )}
            </Transition>
          </Portal>
        </>
      )}
    </Listbox>
  );
}

export default DropdownSelect;
