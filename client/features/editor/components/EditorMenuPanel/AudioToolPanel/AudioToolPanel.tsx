import { UploadOutline } from 'heroicons-react';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../../../components/ui/Button';
import { EditorContainer } from '../../../containers/EditorContainer/EditorContainer';
import AudioModal from '../../AudioModal/AudioModal';
import SideMenuPanel from '../../ui/SideMenuPanel';
import AudioActions from './AudioActions';

function AudioToolPanel() {
  const { state } = EditorContainer.useContainer();
  const [audioUrl, setAudioUrl] = useState<string>();
  const [isAudioSelectVisible, setAudioSelectVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // TODO: move blob creation to state
  // TODO: save bounds/duration to start audio clipper from bounds
  useEffect(() => {
    if (state.audio) {
      setAudioUrl(URL.createObjectURL(state.audio.clip));
      console.log('update', state.audio);
    } else {
      setAudioUrl(undefined);
    }
  }, [state.audio]);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  console.log('audioUrl', audioUrl);

  const handleUploadAudioClick = () => {
    setAudioSelectVisible(true);
  };

  const closeModal = () => {
    setAudioSelectVisible(false);
  };

  return (
    <SideMenuPanel
      title="Audio"
      actions={
        state.audio ? (
          <AudioActions onEditClick={handleUploadAudioClick} />
        ) : undefined
      }
    >
      <AudioModal
        audioFile={state.audio?.file}
        visible={isAudioSelectVisible}
        close={closeModal}
      />
      {audioUrl ? (
        <audio
          ref={audioRef}
          controls
          className="w-full mb-4 focus:outline-none"
        >
          <source src={audioUrl} type="audio/mp3" />
        </audio>
      ) : (
        <Button
          type="gray"
          onClick={handleUploadAudioClick}
          icon={UploadOutline}
        >
          Upload audio
        </Button>
      )}
    </SideMenuPanel>
  );
}

export default AudioToolPanel;
