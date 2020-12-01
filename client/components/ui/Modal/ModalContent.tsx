import React from 'react';
import ModalTitle from './ModalTitle';
import { X } from 'heroicons-react';

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  close?: () => void;
}

function ModalContent({ title, children, close }: Props) {
  return (
    <div className="mt-3 text-center">
      {close && (
        <div className="absolute top-0 right-0 pt-4 pr-4">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
            onClick={close}
          >
            <X />
          </button>
        </div>
      )}
      {title && <ModalTitle>{title}</ModalTitle>}
      <div className="mt-3 text-sm leading-5 text-gray-500">{children}</div>
    </div>
  );
}

export default ModalContent;
