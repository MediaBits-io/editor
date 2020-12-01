import { Transition } from '@headlessui/react';
import React from 'react';
import classNames from '../../../utils/classNames';

interface Props {
  visible: boolean;
  children: React.ReactNode;
  className?: string;
}

function Modal({ visible, children, className = 'max-w-2xl' }: Props) {
  return (
    <Transition
      className="z-10 fixed bottom-0 inset-x-0 px-4 pb-6 sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center"
      show={visible}
    >
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 transition-opacity"
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </Transition.Child>

      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enterTo="opacity-100 translate-y-0 sm:scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        className={classNames(
          'bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:w-full sm:p-6',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {children}
      </Transition.Child>
    </Transition>
  );
}

export default Modal;
