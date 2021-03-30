import React, { forwardRef } from 'react';
import Button from '../../../../components/ui/Button';
import classNames from '../../../../utils/classNames';

type Props = {
  notifications?: number;
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, 'type'>;

const ClearButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, disabled, notifications, children, ...rest }, ref) => {
    return (
      <Button
        {...rest}
        disabled={disabled}
        type="custom"
        className={classNames(
          'p-1.5 rounded-md font-semibold transition duration-150 border border-transparent relative',
          disabled && 'text-gray-300 bg-white',
          !disabled &&
            !notifications &&
            'text-gray-700 bg-white hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 active:text-gray-900 focus:ring-gray-300 focus:outline-none focus:ring-2',
          !disabled &&
            !!notifications &&
            'text-blue-800 bg-blue-50 hover:bg-blue-100 focus:bg-blue-100 active:bg-blue-200 active:text-blue-900 focus:ring-blue-300 focus:outline-none focus:ring-2',
          className
        )}
        ref={ref}
      >
        {children}
        {!!notifications && (
          <span
            className={classNames(
              'absolute text-xs flex justify-center items-center h-4 top-0 right-0 text-center transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white text-blue-900 bg-blue-200',
              notifications < 10 ? 'w-4' : 'px-1'
            )}
          >
            {notifications}
          </span>
        )}
      </Button>
    );
  }
);

export default ClearButton;
