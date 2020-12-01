import React from 'react';

interface Props {
  dismiss: React.ReactNode;
  submit: React.ReactNode;
}

function ModalFullActions({ dismiss, submit }: Props) {
  return (
    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
      <span className="flex w-full rounded-md shadow-sm sm:col-start-2">
        {submit}
      </span>
      <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
        {dismiss}
      </span>
    </div>
  );
}

export default ModalFullActions;
