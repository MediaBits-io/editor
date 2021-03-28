import React from 'react';

interface Props {
  action: React.ReactNode;
}

function ModalFullAction({ action }: Props) {
  return (
    <div className="mt-5 sm:mt-6">
      <span className="flex w-full rounded-md shadow-sm">{action}</span>
    </div>
  );
}

export default ModalFullAction;
