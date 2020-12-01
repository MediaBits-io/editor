import React from 'react';
import { ToastContainerProps } from 'react-toast-notifications';

function NotificationContainer({ children }: ToastContainerProps) {
  return (
    <div className="z-20 fixed inset-0 space-y-2 flex flex-col items-center justify-start px-4 py-6 pointer-events-none sm:p-6 sm:items-end sm:justify-start">
      {children}
    </div>
  );
}

export default NotificationContainer;
