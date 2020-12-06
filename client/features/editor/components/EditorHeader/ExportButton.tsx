import { DownloadOutline } from 'heroicons-react';
import React, { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import Button from '../../../../components/ui/Button';
import NotificationContent from '../../../../components/ui/Notification/NotificationContent';
import { VideosContainer } from '../../../../containers/VideosContainer';
import { EditorContainer } from '../../containers/EditorContainer/EditorContainer';
import AudioModal from '../AudioModal/AudioModal';

function ExportButton() {
  const { template, state, dispatch } = EditorContainer.useContainer();
  const { exportVideo } = VideosContainer.useContainer();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [isAudioSelectVisible, setAudioSelectVisible] = useState(false);

  const saveAndExportVideo = async (clipBuffer: Blob) => {
    try {
      setLoading(true);
      await exportVideo(clipBuffer, template);
      dispatch({
        type: 'add_audio',
        clipBuffer,
        blobUrl: URL.createObjectURL(clipBuffer),
      });
      dispatch({ type: 'save_changes' });
      addToast(
        <NotificationContent title="Video exported successfully">
          It may take a few minutes for the video to get processed
        </NotificationContent>,
        { appearance: 'success' }
      );
    } catch (e) {
      console.error(e);
      const errorText = e?.response?.data?.error;
      if (errorText) {
        addToast(errorText, { appearance: 'error' });
      }
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
