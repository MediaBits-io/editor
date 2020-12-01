import React, { forwardRef } from 'react';
import classNames from '../../utils/classNames';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  children: React.ReactNode;
  noScroll?: boolean;
}

const MainArea = forwardRef<HTMLElement, Props>(
  ({ children, className = 'relative', noScroll, ...rest }, ref) => {
    return (
      <main
        ref={ref}
        tabIndex={0}
        className={classNames(
          'flex flex-col flex-1 z-0 focus:outline-none',
          !noScroll && 'overflow-y-auto',
          className
        )}
        {...rest}
      >
        {children}
      </main>
    );
  }
);

export default MainArea;
