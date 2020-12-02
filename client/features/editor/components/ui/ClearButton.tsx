import React, { forwardRef } from 'react';
import Button, { Props } from '../../../../components/ui/Button';
import classNames from '../../../../utils/classNames';

const ClearButton = forwardRef<HTMLButtonElement, Omit<Props, 'type' | 'ref'>>(
  ({ className, disabled, ...rest }, ref) => {
    return (
      <Button
        {...rest}
        disabled={disabled}
        type="custom"
        className={classNames(
          'p-1.5 rounded-md font-semibold bg-white transition duration-150 border border-transparent',
          disabled
            ? 'text-gray-300'
            : 'text-gray-700 hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-200 active:text-gray-900 focus:ring-gray-300 focus:outline-none focus:ring-2',
          className
        )}
        ref={ref}
      />
    );
  }
);

export default ClearButton;
