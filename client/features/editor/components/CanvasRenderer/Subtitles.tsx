import React from 'react';
import { useRecoilValue } from 'recoil';
import { subtitleIdsState } from '../../state/atoms/template';
import SubtitleRenderer from './SubtitleRenderer';

function Subtitles() {
  const elementIds = useRecoilValue(subtitleIdsState);
  return (
    <>
      {elementIds.map((id) => (
        <SubtitleRenderer key={id} id={id} />
      ))}
    </>
  );
}

export default Subtitles;
