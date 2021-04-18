import React from 'react';

interface Props {
  children: React.ReactNode;
}

function SideMenu({ children }: Props) {
  return (
    <div className="flex flex-col space-y-2 p-2 bg-white border-r">
      {children}
    </div>
  );
}

export default SideMenu;
