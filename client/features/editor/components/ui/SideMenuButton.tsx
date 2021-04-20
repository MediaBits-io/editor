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
  className,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className={classNames(
        'relative h-16 w-16 p-1.5 text-xs flex flex-col items-center justify-center rounded-md focus:outline-none transition duration-150',
        selected ? 'text-gray-200 bg-gray-900' : 'text-gray-300',
        selected && !disabled && 'hover:text-white focus:text-white',
        !selected &&
          !disabled &&
          'hover:bg-gray-700 hover:text-white focus:text-white',
        disabled && 'cursor-default',
        className
      )}
      {...rest}
    >
      {Icon && <Icon className="w-6 h-6" />}
      <div>{children}</div>
    </button>
  );
}

export default SideMenuButton;
