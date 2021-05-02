import React from 'react';
import { useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import { subtitleIdsState } from '../../../state/atoms/template';
import useSubtitlesDispatcher from '../../../state/dispatchers/subtitles';
import SideMenuPanel from '../../ui/SideMenuPanel';
import SubtitlesList from './SubtitlesList';

function SubtitlesToolPanel() {
  const subtitleIds = useRecoilValue(subtitleIdsState);
  const { createSubtitle } = useSubtitlesDispatcher();

  return (
    <SideMenuPanel title="Subtitles">
      {subtitleIds.length > 0 ? (
        <SubtitlesList />
      ) : (
        <Button type="gray" onClick={() => createSubtitle('Test subtitles')}>
          Manual subtitles
        </Button>
      )}
    </SideMenuPanel>
  );
}

export default SubtitlesToolPanel;
