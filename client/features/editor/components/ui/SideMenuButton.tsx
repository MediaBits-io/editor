import React from 'react';
import classNames from '../../../../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ComponentType<{ className?: string }>;
  selected?: boolean;
}

function SideMenuButton({
  icon: Icon,
  children,
  selected,
  disabled,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classNames(
        'h-20 w-20 p-2 text-xs flex flex-col items-center justify-center rounded-md border focus:outline-none transition duration-150',
        selected
          ? 'bg-blue-50 text-blue-800 border-blue-300'
          : 'bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900 focus:border-gray-400 focus:text-gray-900',
        selected &&
          !disabled &&
          'hover:border-blue-400 hover:text-blue-900 focus:border-blue-400 focus:text-blue-900',
        disabled && 'cursor-default'
      )}
      {...rest}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <div>{children}</div>
    </button>
  );
}

export default SideMenuButton;
