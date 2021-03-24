import {
  DownloadOutline,
  PencilOutline,
  ScissorsOutline,
  TrashOutline,
} from 'heroicons-react';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import Popover from '../../../../../components/ui/Popover/Popover';
import { audioSelector } from '../../../state/selectors/audio';
import PanelActionButton from '../../ui/PanelActionButton';

interface Props {
  onEditClick: () => void;
  onTrimClick: () => void;
  onDownloadClick: () => void;
}

function AudioActions({ onEditClick, onTrimClick, onDownloadClick }: Props) {
  const resetAudio = useResetRecoilState(audioSelector);

  return (
    <>
      <Popover content="Trim audio" placement="top" className="flex">
        <PanelActionButton icon={ScissorsOutline} onClick={onTrimClick} />
      </Popover>
      <Popover content="Change file" placement="top" className="flex">
        <PanelActionButton icon={PencilOutline} onClick={onEditClick} />
      </Popover>
      <Popover content="Download audio" placement="top" className="flex">
        <PanelActionButton icon={DownloadOutline} onClick={onDownloadClick} />
      </Popover>
      <Popover content="Remove" placement="top" className="flex">
        <PanelActionButton icon={TrashOutline} onClick={resetAudio} />
      </Popover>
    </>
  );
}

export default AudioActions;
