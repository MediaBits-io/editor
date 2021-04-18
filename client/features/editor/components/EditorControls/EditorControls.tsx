import { MusicNoteIcon, TrashIcon } from '@heroicons/react/outline';
import { PlayIcon } from '@heroicons/react/solid';
import React from 'react';
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil';
import Button from '../../../../components/ui/Button';
import classNames from '../../../../utils/classNames';
import { audioModalState } from '../../state/atoms/ui';
import useAudioDispatcher from '../../state/dispatchers/audio';
import { audioSelector } from '../../state/selectors/audio';
import HistoryControls from '../HistoryControls/HistoryControls';
import ClearButton from '../ui/ClearButton';
import ZoomControls from '../ZoomControls/ZoomControls';

function EditorControls() {
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

  return (
    <div className="flex w-full space-x-2 px-2 pt-2 justify-between items-center">
      {!audio ? (
        <Button
          type="primary"
          icon={MusicNoteIcon}
          onClick={handleUploadClick}
          className="!px-5 !py-2.5 shadow hover:shadow-md"
        >
          Upload audio
        </Button>
      ) : (
        <div
          className={classNames(
            'flex bg-white text-gray-700 rounded-md border p-1.5 space-x-2',
            audio && 'flex-grow'
          )}
        >
          <ClearButton icon={PlayIcon} />
          <ClearButton icon={TrashIcon} onClick={resetAudio} />
        </div>
      )}
      <div className="bg-white rounded-md border p-1.5 flex justify-between space-x-2">
        <ZoomControls />
        <HistoryControls />
      </div>
    </div>
  );
}

export default EditorControls;
