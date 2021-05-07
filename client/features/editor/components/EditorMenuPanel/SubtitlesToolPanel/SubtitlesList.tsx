import React from 'react';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';
import { subtitlesByStartSelector } from '../../../state/selectors/subtitles';
import SubtitleCard from './SubtitleCard';

function SubtitlesList() {
  const subtitles = useRecoilValue(subtitlesByStartSelector);
  const { createSubtitle } = useSubtitlesDispatcher();

  return (
    <>
      <div className="flex flex-col">
        {subtitles.map((subtitle) => (
          <SubtitleCard key={subtitle.id} subtitle={subtitle} />
        ))}
      </div>
      <Button
        type="gray"
        onClick={() => {
          createSubtitle('New subtitle line');
        }}
      >
        New line
      </Button>
    </>
  );
}

export default SubtitlesList;
