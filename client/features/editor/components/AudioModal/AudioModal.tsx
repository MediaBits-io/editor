import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Modal from '../../../../components/ui/Modal/Modal';
import ModalFullActions from '../../../../components/ui/Modal/ModalFullActions';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import useAudioClipper from '../../../../components/AudioClipper/useAudioClipper';
import ExternalLink from '../../../../components/ui/ExternalLink';
import Alert from '../../../../components/ui/Alert';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';

// TODO: base max video length on plan
const MAX_VIDEO_LENGTH = 60;

interface ClipBounds {
  startPart: number;
  endPart: number;
  duration: number;
}

interface Props {
  visible: boolean;
  close: () => void;
  onContinue?: (clipBuffer: Blob) => Promise<void>;
  audioFile?: File;
}

const AudioClipper = dynamic(
  () => import('../../../../components/AudioClipper/AudioClipper'),
  { ssr: false }
);

function AudioModal({ visible, close, audioFile, onContinue }: Props) {
  const { dispatch } = EditorContainer.useContainer();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const [bounds, setBounds] = useState<ClipBounds>();
  const { clipAudio } = useAudioClipper(file);

  useEffect(() => {
    if (visible) {
      setFile(audioFile);
    }
  }, [visible, audioFile]);

  const handleSubmit = async () => {
    if (!bounds || !file) {
      return;
    }

    try {
      setLoading(true);
      const audioBuffer = await clipAudio(bounds.startPart, bounds.endPart);
      dispatch({ type: 'add_audio', audioFile: file, clipBuffer: audioBuffer });
      await onContinue?.(audioBuffer);
      close();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setFile(undefined);
  };

  const fileTooBig = audioFile && audioFile.size > 50 * 1024 * 1024;
  const clipDuration =
    bounds && (bounds.endPart - bounds.startPart) * bounds.duration;
  const videoTooLong = !!clipDuration && MAX_VIDEO_LENGTH < clipDuration;

  const renderError = () => {
    if (!clipDuration) {
      return null;
    }

    // TODO: don't show for PRO plan
    if (videoTooLong) {
      return (
        <Alert type="error" title="Video is too long" className="mt-4">
          Can't export {Math.floor(clipDuration)} seconds of video. Maximum
          video length is {MAX_VIDEO_LENGTH} seconds. <br />
          Upgrade your plan to export this video today!
        </Alert>
      );
    }

    return null;
  };

  return (
    <Modal visible={visible}>
      <ModalContent title="Add audio">
        {fileTooBig ? (
          <>
            <img
              src="/images/firefighter.svg"
              alt="Error"
              className="w-32 mx-auto mb-4"
            />
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
              File is too big :(
            </h3>
            <p>We can't load files larger than 50MB.</p>
            <p className="mb-2">
              Try trimming the audio to under 50MB before uploading it.
            </p>
            <p>
              You can use{' '}
              <ExternalLink newTab to="https://www.audacityteam.org">
                Audacity
              </ExternalLink>{' '}
              to do that for free.
            </p>
          </>
        ) : (
          <AudioClipper
            audioFile={file}
            onChange={setBounds}
            setAudioFile={setFile}
          />
        )}
        {renderError()}
      </ModalContent>
      <ModalFullActions
        dismiss={
          <ModalAction disabled={loading} onClick={close} type="secondary">
            Cancel
          </ModalAction>
        }
        submit={
          fileTooBig ? (
            <ModalAction type="accented" onClick={handleTryAgain}>
              Try again
            </ModalAction>
          ) : (
            <ModalAction
              loading={loading}
              disabled={!bounds}
              onClick={handleSubmit}
            >
              Confirm
            </ModalAction>
          )
        }
      />
    </Modal>
  );
}

export default AudioModal;
