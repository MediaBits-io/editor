import React from 'react';
import { ToastProps } from 'react-toast-notifications';
import {
  X,
  XCircle,
  Exclamation,
  CheckCircle,
  InformationCircle,
} from 'heroicons-react';
import classNames from '../../../utils/classNames';
import NotificationContent from './NotificationContent';

function Notification({
  transitionState,
  onDismiss,
  children,
  appearance = 'info',
}: ToastProps) {
  const Icon = {
    error: XCircle,
    warning: Exclamation,
    success: CheckCircle,
    info: InformationCircle,
  }[appearance];

  return (
    <div
      className={classNames(
        'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto bg-white',
        (transitionState === 'entered' || transitionState === 'entering') &&
          'transform ease-out duration-300 transition',
        transitionState === 'entering' &&
          '-translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2',
        transitionState === 'entered' &&
          'translate-y-0 opacity-100 sm:translate-x-0',
        (transitionState === 'exited' || transitionState === 'exiting') &&
          'transform transition ease-in duration-100',
        transitionState === 'exiting' && 'opacity-0'
      )}
    >
      <div className="rounded-lg shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon
                className={classNames(
                  'h-6 w-6',
                  appearance === 'info' && 'text-blue-400',
                  appearance === 'error' && 'text-red-400',
                  appearance === 'warning' && 'text-yellow-400',
                  appearance === 'success' && 'text-green-400'
                )}
              />
            </div>
            {typeof children === 'string' ? (
              <NotificationContent title={children} />
            ) : (
              children
            )}
            <div className="ml-4 flex-shrink-0 flex">
              <button
                type="button"
                className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                onClick={() => onDismiss()}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
