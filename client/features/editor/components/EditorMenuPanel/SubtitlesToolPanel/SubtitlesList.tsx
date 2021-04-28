import React from 'react';
import { useRecoilValue } from 'recoil';
import { subtitlesSelector } from '../../../state/selectors/subtitles';

function SubtitlesList() {
  const subtitles = useRecoilValue(subtitlesSelector);

  return (
    <div className="flex flex-col">
      {subtitles.map((subtitle) => (
        <div className="mb-3">
          [{subtitle.start}-{subtitle.end}]: {subtitle.text}
        </div>
      ))}
    </div>
  );
}

export default SubtitlesList;
