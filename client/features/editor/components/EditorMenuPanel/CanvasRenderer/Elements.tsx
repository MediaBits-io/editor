import React from 'react';
import { useRecoilValue } from 'recoil';
import { elementIdsState } from '../../../state/atoms/template';
import ElementRenderer from './ElementRenderer';

function Elements() {
  const elementIds = useRecoilValue(elementIdsState);
  return (
    <>
      {elementIds.map((id) => (
        <ElementRenderer key={id} id={id} />
      ))}
    </>
  );
}

export default Elements;
