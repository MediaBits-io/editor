import {
  DownloadIcon,
  MusicNoteIcon,
  PencilIcon,
  ScissorsIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from 'recoil';
import Button from '../../../../components/ui/Button';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import { userPlanInfoSelector } from '../../../../state/selectors/user';
import { audioState } from '../../state/atoms/audio';
import { audioModalState } from '../../state/atoms/ui';
import useAudioDispatcher from '../../state/dispatchers/audio';
import ClearButton from '../ui/ClearButton';
import AudioBar from './AudioBar';

function AudioControls() {
  const userPlanInfo = useRecoilValue(userPlanInfoSelector);
  const [audio, setAudio] = useRecoilState(audioState);
  const resetAudio = useResetRecoilState(audioState);
  const { setNewAudio } = useAudioDispatcher();
  const [currentAudio, setCurrentAudio] = useState(audio);
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentAudio((currentAudio) => {
      if (currentAudio?.url === audio?.url) {
        return currentAudio;
      }

      // Sync audio from state if changed and remove local blob urls
      if (currentAudio) {
        // TODO: revoke at some point, but only when can't be undone, like history event
        // URL.revokeObjectURL(currentAudio.url);
      }

      return audio;
    });
  }, [audio]);

  useEffect(() => {
    if (audioRef.current && currentAudio) {
      audioRef.current.load();
    }
  }, [currentAudio]);

  const openTrimModal = useRecoilCallback(
    ({ set }) => () => {
      set(audioModalState, {
        visible: true,
        initialAudio: currentAudio,
        onContinue: setNewAudio,
        onCancel: () => {
          setCurrentAudio((currentAudio) => {
            // Clear temporary audio if canceled and not assigned yet
            if (!audio && currentAudio) {
              URL.revokeObjectURL(currentAudio.url);
              return undefined;
            }
            return audio;
          });
        },
      });
    },
    [audio, currentAudio, setNewAudio]
  );

  const handleUploadAudioClick = () => {
    inputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setCurrentAudio(
      file && {
        data: file,
        url: URL.createObjectURL(file),
      }
    );

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleAudioMetadataLoaded = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    if (!currentAudio) {
      return;
    }

    // Automatically open clipping when audio is too long
    if (Math.round(e.currentTarget.duration) > userPlanInfo.durationLimit) {
      openTrimModal();
    } else if (currentAudio.url !== audio?.url) {
      setAudio({
        url: currentAudio.url,
        data: currentAudio.data,
      });
    }
  };

  const handleDownloadAudio = () => {
    if (currentAudio) {
      saveAs(currentAudio.url, 'audio.mp3');
    }
  };

  return (
    <div className="flex w-full items-center px-2">
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept="audio/*"
      />

      {!currentAudio ? (
        <Button
          type="primary"
          icon={MusicNoteIcon}
          onClick={handleUploadAudioClick}
          className="shadow"
        >
          Upload audio
        </Button>
      ) : (
        <>
          <audio
            ref={audioRef}
            className="hidden"
            onLoadedMetadata={handleAudioMetadataLoaded}
          >
            <source src={currentAudio.url} type="audio/mp3" />
          </audio>
          <AudioBar audioUrl={currentAudio.url} />
          <div className="flex space-x-2 ml-2">
            <Tooltip
              content="Trim audio"
              placement="bottom"
              className="flex items-center"
            >
              <ClearButton icon={ScissorsIcon} onClick={openTrimModal} />
            </Tooltip>
            <Tooltip
              content="Change file"
              placement="bottom"
              className="flex items-center"
            >
              <ClearButton icon={PencilIcon} onClick={handleUploadAudioClick} />
            </Tooltip>
            <Tooltip
              content="Download audio"
              placement="bottom"
              className="flex items-center"
            >
              <ClearButton icon={DownloadIcon} onClick={handleDownloadAudio} />
            </Tooltip>
            <Tooltip
              content="Remove audio"
              placement="bottom"
              className="flex items-center"
            >
              <ClearButton icon={TrashIcon} onClick={resetAudio} />
            </Tooltip>
          </div>
        </>
      )}
    </div>
  );
}

export default AudioControls;
