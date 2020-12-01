import { Menu } from '@headlessui/react';
import React from 'react';
import DropdownButton from '../Dropdown/DropdownButton';

function DropdownMenuButton(
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) {
  return (
    <Menu.Item>
      {({ active }) => (
        <DropdownButton state={active ? 'active' : undefined} {...props} />
      )}
    </Menu.Item>
  );
}

export default DropdownMenuButton;
