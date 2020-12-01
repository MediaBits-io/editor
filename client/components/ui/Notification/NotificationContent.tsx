import React from 'react';

interface Props {
  title: React.ReactNode;
  children?: React.ReactNode;
}

function NotificationContent({ children, title }: Props) {
  return (
    <div className="ml-3 w-0 flex-1 pt-0.5">
      {title && (
        <p className="text-sm leading-5 font-medium text-gray-900">{title}</p>
      )}
      {children && (
        <p className="mt-1 text-sm leading-5 text-gray-500">{children}</p>
      )}
    </div>
  );
}

export default NotificationContent;
