import {
  DownloadIcon,
  PencilIcon,
  ScissorsIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useResetRecoilState } from 'recoil';
import Tooltip from '../../../../../components/ui/Tooltip/Tooltip';
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
      <Tooltip content="Trim audio" placement="top" className="flex">
        <PanelActionButton icon={ScissorsIcon} onClick={onTrimClick} />
      </Tooltip>
      <Tooltip content="Change file" placement="top" className="flex">
        <PanelActionButton icon={PencilIcon} onClick={onEditClick} />
      </Tooltip>
      <Tooltip content="Download audio" placement="top" className="flex">
        <PanelActionButton icon={DownloadIcon} onClick={onDownloadClick} />
      </Tooltip>
      <Tooltip content="Remove" placement="top" className="flex">
        <PanelActionButton icon={TrashIcon} onClick={resetAudio} />
      </Tooltip>
    </>
  );
}

export default AudioActions;
