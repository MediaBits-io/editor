import React from 'react';

interface Props {
  children: React.ReactNode;
}

function SideMenu({ children }: Props) {
  return <div className="flex flex-col space-y-2 m-2">{children}</div>;
}

export default SideMenu;
