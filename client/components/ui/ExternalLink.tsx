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
  type?: 'normal' | 'light' | 'custom';
}

const ExternalLink = forwardRef<HTMLAnchorElement, Props>(
  ({ children, className, to, newTab, type = 'normal', ...rest }, ref) => {
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
          type !== 'custom' &&
            'font-medium hover:underline focus:underline focus:outline-none transition duration-150',
          type === 'light' && 'text-blue-400 hover:text-blue-500',
          type === 'normal' && 'text-blue-600 hover:text-blue-400',
          className
        )}
      >
        {children || to}
      </a>
    );
  }
);

export default ExternalLink;
