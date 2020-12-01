import React, { forwardRef } from 'react';
import classNames from '../../../utils/classNames';
import Button, { Props as ButtonProps } from '../Button';

const ModalAction = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...rest }, ref) => {
    return (
      <Button
        className={classNames('w-full shadow-sm', className)}
        {...rest}
        ref={ref}
      />
    );
  }
);

export default ModalAction;
