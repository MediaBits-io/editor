import React from 'react';
import classNames from '../../../utils/classNames';

interface Props {
  className?: string;
}

function Loader({ className }: Props) {
  return (
    <div className={classNames('loader h-5', className)}>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
}

export default Loader;
