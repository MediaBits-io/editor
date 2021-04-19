import {
  DownloadIcon,
  PencilIcon,
  ScissorsIcon,
  TrashIcon,
  MusicNoteIcon,
  PlayIcon,
} from '@heroicons/react/outline';
import React from 'react';
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';
import Button from '../../../../components/ui/Button';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import classNames from '../../../../utils/classNames';
import { audioModalState } from '../../state/atoms/ui';
import useAudioDispatcher from '../../state/dispatchers/audio';
import { audioSelector } from '../../state/selectors/audio';
import ClearButton from '../ui/ClearButton';

function AudioControls() {
  const audio = useRecoilValue(audioSelector);
  const resetAudio = useResetRecoilState(audioSelector);
  const { setNewAudio } = useAudioDispatcher();

  const handleUploadClick = useRecoilCallback(
    ({ set }) => () => {
      set(audioModalState, {
        visible: true,
        onContinue: setNewAudio,
      });
    },
    [setNewAudio]
  );

  // TODO: implement actions
  return !audio ? (
    <Button
      type="primary"
      icon={MusicNoteIcon}
      onClick={handleUploadClick}
      className="shadow"
    >
      Upload audio
    </Button>
  ) : (
    <div className={classNames('flex space-x-2 p-0.5', audio && 'flex-grow')}>
      <Tooltip content="Play audio" placement="bottom" className="flex">
        <ClearButton icon={PlayIcon} />
      </Tooltip>
      <div className="flex flex-grow rounded-md bg-gray-100" />
      <Tooltip content="Trim audio" placement="bottom" className="flex">
        <ClearButton icon={ScissorsIcon} />
      </Tooltip>
      <Tooltip content="Change file" placement="bottom" className="flex">
        <ClearButton icon={PencilIcon} />
      </Tooltip>
      <Tooltip content="Download audio" placement="bottom" className="flex">
        <ClearButton icon={DownloadIcon} />
      </Tooltip>
      <Tooltip content="Remove audio" placement="bottom" className="flex">
        <ClearButton icon={TrashIcon} onClick={resetAudio} />
      </Tooltip>
    </div>
  );
}

export default AudioControls;
