import React from 'react';
import {
  Exclamation,
  XCircle,
  CheckCircle,
  InformationCircle,
  X,
} from 'heroicons-react';
import classNames from '../../utils/classNames';

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'title'
  > {
  title: React.ReactNode;
  type?: 'error' | 'warning' | 'success' | 'info';
  children?: React.ReactNode;
  onClose?: () => void;
}

function Alert({
  title,
  children,
  type = 'info',
  className,
  onClose,
  ...rest
}: Props) {
  const Icon = {
    error: XCircle,
    warning: Exclamation,
    success: CheckCircle,
    info: InformationCircle,
  }[type];

  return (
    <div
      className={classNames(
        'rounded-md p-4 text-left',
        type === 'info' && 'bg-blue-50',
        type === 'error' && 'bg-red-50',
        type === 'warning' && 'bg-yellow-50',
        type === 'success' && 'bg-green-50',
        className
      )}
      {...rest}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon
            className={classNames(
              'h-5 w-5',
              type === 'info' && 'text-blue-400',
              type === 'error' && 'text-red-400',
              type === 'warning' && 'text-yellow-400',
              type === 'success' && 'text-green-400'
            )}
          />
        </div>
        <div className="ml-3">
          <div className="flex">
            <h3
              className={classNames(
                'text-sm leading-5 font-medium',
                type === 'info' && 'text-blue-800',
                type === 'error' && 'text-red-800',
                type === 'warning' && 'text-yellow-800',
                type === 'success' && 'text-green-800'
              )}
            >
              {title}
            </h3>

            {onClose && (
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    type="button"
                    className={classNames(
                      'inline-flex rounded-md p-1.5 focus:outline-none transition ease-in-out duration-150',
                      type === 'info' &&
                        'text-blue-500 hover:bg-blue-100 focus:bg-blue-100',
                      type === 'error' &&
                        'text-red-500 hover:bg-red-100 focus:bg-red-100',
                      type === 'warning' &&
                        'text-yellow-500 hover:bg-yellow-100 focus:bg-yellow-100',
                      type === 'success' &&
                        'text-green-500 hover:bg-green-100 focus:bg-green-100'
                    )}
                    aria-label="Dismiss"
                    onClick={onClose}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
          {children && (
            <div
              className={classNames(
                'mt-2 text-sm leading-5',
                type === 'info' && 'text-blue-700',
                type === 'error' && 'text-red-700',
                type === 'warning' && 'text-yellow-700',
                type === 'success' && 'text-green-700'
              )}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Alert;
