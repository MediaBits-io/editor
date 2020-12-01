import React from 'react';
import { Listbox } from '@headlessui/react';
import DoubleChevron from '../Icons/DoubleChevron';
import classNames from '../../../utils/classNames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function DropdownSelectAnchor({ className, children }: Props) {
  return (
    <Listbox.Button className={classNames('pr-10', className)}>
      <span className="block truncate">{children}</span>
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <DoubleChevron className="h-5 w-5 text-gray-400" />
      </span>
    </Listbox.Button>
  );
}

export default DropdownSelectAnchor;
