import React from 'react';
import { Line } from 'react-konva';
import { useRecoilValue } from 'recoil';
import { guideLinesState } from '../../state/atoms/editor';

function GuideLines() {
  const guideLines = useRecoilValue(guideLinesState);

  return guideLines.length ? (
    <>
      {guideLines.map((props) => (
        <Line key={props.id} {...props} />
      ))}
    </>
  ) : null;
}

export default GuideLines;
