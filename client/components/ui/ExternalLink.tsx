import React, { forwardRef } from 'react';
import classNames from '../../utils/classNames';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    'href'
  > {
  to: string;
  newTab?: boolean;
  custom?: boolean;
}

const ExternalLink = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, to, newTab, custom, ...rest }, ref) => {
    const additional = newTab
      ? {
          rel: 'noopener noreferrer',
          target: '_blank',
        }
      : {};
    return (
      <a
        {...additional}
        {...rest}
        ref={ref}
        href={to}
        className={classNames(
          !custom &&
            'font-medium text-blue-600 hover:text-blue-400 focus:outline-none focus:underline transition ease-in-out duration-150',
          className
        )}
      >
        {children}
      </a>
    );
  }
);

export default ExternalLink;
