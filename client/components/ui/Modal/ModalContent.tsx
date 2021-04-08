import React from 'react';
import ModalTitle from './ModalTitle';
import { XIcon } from '@heroicons/react/solid';
import classNames from '../../../utils/classNames';

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  close?: () => void;
}

function ModalContent({ title, children, close, className }: Props) {
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
            <XIcon />
          </button>
        </div>
      )}
      {title && <ModalTitle>{title}</ModalTitle>}
      <div
        className={classNames(
          'mt-3 text-sm leading-5 text-gray-500',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalContent;
