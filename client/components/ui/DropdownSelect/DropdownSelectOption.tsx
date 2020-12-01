import { Listbox } from '@headlessui/react';
import React from 'react';
import classNames from '../../../utils/classNames';

interface Props<Value>
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'children'
  > {
  value: Value;
  children:
    | React.ReactNode
    | ((props: {
        active: boolean;
        selected: boolean;
        disabled: boolean;
      }) => React.ReactNode);
}

function DropdownSelectOption<Value extends React.ReactText>({
  className,
  children,
  value,
  ...rest
}: Props<Value>) {
  return (
    <Listbox.Option className="focus:outline-none cursor-pointer" value={value}>
      {(props) => (
        <div
          className={classNames(
            'flex justify-between w-full px-4 py-2 text-sm leading-5 text-left transition duration-150',
            props.active ? 'bg-gray-100 text-gray-600' : 'text-gray-500',
            props.selected && 'bg-blue-100 text-blue-800',
            className
          )}
          {...rest}
        >
          {typeof children === 'function' ? children(props) : children}
        </div>
      )}
    </Listbox.Option>
  );
}

export default DropdownSelectOption;
