import React, { forwardRef } from 'react';
import Button, { Props } from '../../../../components/ui/Button';
import classNames from '../../../../utils/classNames';

const PanelActionButton = forwardRef<
  HTMLButtonElement,
  Omit<Props, 'type'> & {
    type?: 'gray' | 'white';
    iconClass?: string;
  }
>(
  (
    {
      className,
      children,
      disabled,
      type = 'gray',
      icon: Icon,
      iconClass,
      ...rest
    },
    ref
  ) => {
    return (
      <Button
        type="custom"
        disabled={disabled}
        className={classNames(
          'p-1 flex-none rounded focus:outline-none',
          disabled
            ? 'bg-gray-50 text-gray-300 cursor-default'
            : 'focus:ring-gray-300 focus:ring-2 active:bg-gray-200 active:text-gray-900',
          !disabled &&
            (type === 'gray'
              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              : 'bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-600'),
          className
        )}
        {...rest}
        ref={ref}
      >
        {Icon && <Icon className={classNames('w-4 h-4', iconClass)} />}
        {children}
      </Button>
    );
  }
);

export default PanelActionButton;
