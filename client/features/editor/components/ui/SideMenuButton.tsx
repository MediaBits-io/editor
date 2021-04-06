import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';
import React from 'react';
import Popover from '../../../../components/ui/Popover/Popover';
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
        'relative h-20 w-20 p-2 text-xs flex flex-col items-center justify-center rounded-md border focus:outline-none transition duration-150',
        selected
          ? 'bg-blue-50 text-blue-800 border-blue-300'
          : 'bg-white text-gray-700 hover:border-gray-400 hover:text-gray-900 focus:border-gray-400 focus:text-gray-900',
        selected &&
          !disabled &&
          'hover:border-blue-400 hover:text-blue-900 focus:border-blue-400 focus:text-blue-900',
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
        <Popover
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
        </Popover>
      )}
      {Icon && <Icon className="w-6 h-6" />}
      <div>{children}</div>
    </button>
  );
}

export default SideMenuButton;
