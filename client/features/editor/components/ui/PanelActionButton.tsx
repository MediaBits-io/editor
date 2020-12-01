import React, { forwardRef } from 'react';
import Button, { Props } from '../../../../components/ui/Button';
import classNames from '../../../../utils/classNames';

const PanelActionButton = forwardRef<
  HTMLButtonElement,
  Omit<Props, 'children'>
>(({ className, disabled, icon: Icon, ...rest }, ref) => {
  return (
    <Button
      type="custom"
      disabled={disabled}
      className={classNames(
        'p-1 flex-none rounded focus:outline-none',
        disabled
          ? 'bg-gray-50 text-gray-300 cursor-default'
          : 'bg-gray-100 text-gray-600 focus:ring-gray-300 hover:bg-gray-200 hover:text-gray-900 active:bg-gray-200 active:text-gray-900 focus:ring-2',
        className
      )}
      {...rest}
      ref={ref}
    >
      {Icon && <Icon className="w-4 h-4" />}
    </Button>
  );
});

export default PanelActionButton;
