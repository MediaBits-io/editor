import React from 'react';
import Dropdown, { Props } from './Dropdown/Dropdown';

function Flyout({
  transitionClass = ['translate-y-1', 'translate-y-0'],
  ...rest
}: Props) {
  return (
    <Dropdown transitionClass={transitionClass} autoClose={false} {...rest} />
  );
}

export default Flyout;
