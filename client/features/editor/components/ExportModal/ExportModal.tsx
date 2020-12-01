import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import dynamic from 'next/dynamic';
import Modal from '../../../../components/ui/Modal/Modal';
import ModalFullActions from '../../../../components/ui/Modal/ModalFullActions';
import ModalAction from '../../../../components/ui/Modal/ModalAction';
import ModalContent from '../../../../components/ui/Modal/ModalContent';
import useAudioClipper from '../../../../components/AudioClipper/useAudioClipper';
import { VideosContainer } from '../../../../containers/VideosContainer';
import ExternalLink from '../../../../components/ui/ExternalLink';
import Alert from '../../../../components/ui/Alert';
import NotificationContent from '../../../../components/ui/Notification/NotificationContent';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';

const MAX_VIDEO_LENGTH = 60;

interface Props {
  visible: boolean;
  close: () => void;
}

const AudioClipper = dynamic(
  () => import('../../../../components/AudioClipper/AudioClipper'),
  { ssr: false }
);

function ExportModal({ visible, close }: Props) {
  const { template } = EditorContainer.useContainer();
  const { exportVideo } = VideosContainer.useContainer();
  const [loading, setLoading] = useState(false);
  const [audioFile, setAudioFile] = useState<File>();
  const [bounds, setBounds] = useState<{
    startPart: number;
    endPart: number;
    duration: number;
  }>();
  const { clipAudio } = useAudioClipper(audioFile);
  const { addToast } = useToasts();

  useEffect(() => {
    if (visible) {
      setAudioFile(undefined);
    }
    // TODO: clear audio file on close with timer
  }, [visible]);

  const handleSubmit = async () => {
    if (!bounds) {
      return;
    }

    try {
      setLoading(true);
      const audioBuffer = await clipAudio(bounds.startPart, bounds.endPart);
      await exportVideo(audioBuffer, template);
      // TODO: clear unsaved changes flag
      close();
      addToast(
        <NotificationContent title="Video exported successfully">
          It may take a few minutes for the video to get processed
        </NotificationContent>,
        { appearance: 'success' }
      );
    } catch (e) {
      const errorText = e?.response?.data?.error;
      if (errorText) {
        addToast(errorText, { appearance: 'error' });
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleTryAgain = () => {
    setAudioFile(undefined);
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
      <ModalContent title="Export Video">
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
            audioFile={audioFile}
            onChange={setBounds}
            setAudioFile={setAudioFile}
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
              Proceed
            </ModalAction>
          )
        }
      />
    </Modal>
  );
}

export default ExportModal;
