import React from 'react';

interface Props {
  children: React.ReactNode;
}

function ModalTitle({ children }: Props) {
  return (
    <h3
      className="text-lg leading-6 font-medium text-gray-900"
      id="modal-headline"
    >
      {children}
    </h3>
  );
}

export default ModalTitle;
