import React from 'react';
import classNames from '../../../utils/classNames';

interface Props {
  className?: string;
}

function Loader({ className }: Props) {
  return (
    <div className={classNames('loader h-5', className)}>
      <div className="rect1" />
      <div className="rect2" />
      <div className="rect3" />
      <div className="rect4" />
      <div className="rect5" />
    </div>
  );
}

export default Loader;
