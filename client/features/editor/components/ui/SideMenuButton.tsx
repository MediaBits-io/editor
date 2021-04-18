import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: React.ComponentType<{ className?: string }>;
  selected?: boolean;
  toggled?: boolean;
}

function SideMenuButton({
  icon: Icon,
  children,
  selected,
  disabled,
  onClick,
  toggled,
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
        selected ? 'text-blue-800 bg-blue-50' : 'text-gray-700',
        selected &&
          !disabled &&
          ' hover:bg-blue-100 hover:text-blue-900 focus:text-blue-900',
        !selected &&
          !disabled &&
          'hover:bg-gray-50 hover:text-gray-800 focus:text-gray-800',
        disabled && 'cursor-default',
        className
      )}
      {...rest}
    >
      {toggled === true && (
        <CheckCircleIcon
          className={classNames(
            'absolute right-0.5 top-0.5 w-5 h-5 transition duration-150',
            selected ? 'text-blue-300' : 'text-blue-200'
          )}
        />
      )}
      {toggled === false && (
        <Tooltip
          className="absolute right-0.5 top-0.5"
          content="Required for generating video"
          placement="top"
        >
          <ExclamationCircleIcon
            className={classNames(
              'w-5 h-5 transition duration-150',
              selected ? 'text-red-300' : 'text-red-300'
            )}
          />
        </Tooltip>
      )}
      {Icon && <Icon className="w-6 h-6" />}
      <div>{children}</div>
    </button>
  );
}

export default SideMenuButton;
