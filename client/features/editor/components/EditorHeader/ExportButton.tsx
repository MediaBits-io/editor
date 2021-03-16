import { DownloadOutline } from 'heroicons-react';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Button from '../../../../components/ui/Button';
import ExternalLink from '../../../../components/ui/ExternalLink';
import NotificationContent from '../../../../components/ui/Notification/NotificationContent';
import useVideos from '../../../../hooks/useVideos';
import { openNewsletterWindow } from '../../../../utils/newsletter';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import AudioModal from '../AudioModal/AudioModal';

function ExportButton() {
  const { template, state, dispatch } = EditorContainer.useContainer();
  const { exportVideo } = useVideos();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [isAudioSelectVisible, setAudioSelectVisible] = useState(false);

  const saveAndExportVideo = async (clipBuffer: Blob) => {
    try {
      setLoading(true);
      const exportPromise = exportVideo(clipBuffer, template);
      dispatch({
        type: 'add_audio',
        clipBuffer,
        blobUrl: URL.createObjectURL(clipBuffer),
      });
      const { isNewRegularUser } = await exportPromise;
      addToast(
        <NotificationContent title="Video exported successfully">
          It may take a few minutes for the video to get processed
        </NotificationContent>,
        { appearance: 'success' }
      );
      if (isNewRegularUser) {
        addToast(
          <NotificationContent title="Keep up to date">
            You seem to be enjoying mediabits.io
            <br />
            Would you like to stay informed about latest updates and special
            offers?
            <br />
            <Button
              type="link"
              className="justify-start"
              onClick={openNewsletterWindow}
            >
              Subscribe to our newsletter
            </Button>
          </NotificationContent>,
          { appearance: 'info', autoDismiss: false }
        );
      }
    } catch (e) {
      console.error(e);
      const errorText = e?.response?.data?.error || "Something's wrong";
      addToast(
        <NotificationContent title={errorText}>
          Please contact support through
          <ExternalLink
            className="mx-1"
            newTab
            to="mailto:support@mediabits.io"
          >
            support@mediabits.io
          </ExternalLink>
        </NotificationContent>,
        { appearance: 'error', autoDismiss: false }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClickExport = () => {
    if (!state.audio) {
      setAudioSelectVisible(true);
    } else {
      saveAndExportVideo(state.audio.data);
    }
  };

  const closeExport = () => {
    setAudioSelectVisible(false);
  };

  return (
    <>
      <AudioModal
        initialAudio={state.audio}
        onContinue={saveAndExportVideo}
        visible={isAudioSelectVisible}
        close={closeExport}
      />
      <Button
        className="w-40"
        loading={loading}
        onClick={handleClickExport}
        icon={DownloadOutline}
        type="primary"
      >
        Generate video
      </Button>
    </>
  );
}

export default ExportButton;
