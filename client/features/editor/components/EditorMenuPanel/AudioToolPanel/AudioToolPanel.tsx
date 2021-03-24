import { UploadOutline } from 'heroicons-react';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Button from '../../../../../components/ui/Button';
import { Plan } from '../../../../../interfaces/plans';
import { userPlanState } from '../../../../../state/atoms/user';
import { userPlanInfoSelector } from '../../../../../state/selectors/user';
import { AudioState } from '../../../interfaces/Audio';
import { audioSelector } from '../../../state/selectors/audio';
import AudioModal from '../../AudioModal/AudioModal';
import SideMenuPanel from '../../ui/SideMenuPanel';
import AudioActions from './AudioActions';

function AudioToolPanel() {
  const userPlan = useRecoilValue(userPlanState);
  const userPlanInfo = useRecoilValue(userPlanInfoSelector);
  const [audio, setAudio] = useRecoilState(audioSelector);
  const [isTrimModalVisible, setTrimModalVisible] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<AudioState>();
  const audioRef = useRef<HTMLAudioElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFree = userPlan.plan === Plan.Free;

  useEffect(() => {
    if (!isTrimModalVisible) {
      setCurrentAudio((currentAudio) => {
        if (currentAudio?.url === audio?.url) {
          return currentAudio;
        }

        // Sync audio from state if changed and remove local blob urls
        if (currentAudio) {
          URL.revokeObjectURL(currentAudio.url);
        }

        return audio;
      });
    }
  }, [audio, isTrimModalVisible]);

  useEffect(() => {
    if (audioRef.current && currentAudio) {
      audioRef.current.load();
    }
  }, [currentAudio]);

  const openTrimModal = () => {
    setTrimModalVisible(true);
  };

  const closeTrimModal = () => {
    setTrimModalVisible(false);
  };

  const handleUploadAudioClick = () => {
    inputRef.current?.click();
  };

  const changeAudioFile = (file?: Blob) => {
    setCurrentAudio(
      file
        ? {
            data: file,
            url: URL.createObjectURL(file),
          }
        : undefined
    );
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeAudioFile(e.target.files?.[0]);
  };

  const handleChangeAudio = (data: Blob) => {
    setAudio({
      url: URL.createObjectURL(data),
      data,
    });
  };

  const handleAudioMetadataLoaded = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    // Automatically open clipping when audio is too long
    if (
      currentAudio &&
      Math.round(e.currentTarget.duration) > userPlanInfo.durationLimit
    ) {
      openTrimModal();
    } else if (currentAudio && currentAudio.url !== audio?.url) {
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
    <SideMenuPanel
      title="Audio"
      actions={
        audio ? (
          <AudioActions
            onTrimClick={openTrimModal}
            onEditClick={handleUploadAudioClick}
            onDownloadClick={handleDownloadAudio}
          />
        ) : undefined
      }
    >
      <AudioModal
        initialAudio={currentAudio}
        onContinue={handleChangeAudio}
        visible={isTrimModalVisible}
        close={closeTrimModal}
      />
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept="audio/*"
      />
      {currentAudio ? (
        <audio
          ref={audioRef}
          controls
          className="w-full mb-4 focus:outline-none"
          onLoadedMetadata={handleAudioMetadataLoaded}
        >
          <source src={currentAudio.url} type="audio/mp3" />
        </audio>
      ) : (
        <>
          <Button
            type="gray"
            className="mb-2"
            onClick={handleUploadAudioClick}
            icon={UploadOutline}
          >
            Upload audio
          </Button>

          <div className="mb-2 text-xs text-gray-500">
            {isFree && 'Maximum duration is 1 minute for free users. '}You can
            trim an audio file of 50MB or less after uploading it.
          </div>
        </>
      )}
    </SideMenuPanel>
  );
}

export default AudioToolPanel;
