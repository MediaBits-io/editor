import React from 'react';
import classNames from '../../../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  state?: 'selected' | 'active' | 'stateless';
}

function DropdownButton({ className, state, ...rest }: Props) {
  return (
    <button
      type="button"
      className={classNames(
        'flex justify-between w-full px-4 py-2 text-sm leading-5 focus:outline-none translate duration-150',
        !state && 'text-gray-700',
        state === 'stateless' &&
          'text-gray-600 hover:bg-gray-100 hover:text-gray-800',
        state === 'active' && 'bg-gray-100 text-gray-800',
        state === 'selected' && 'bg-blue-100 text-blue-800',
        className
      )}
      {...rest}
    />
  );
}

export default DropdownButton;
