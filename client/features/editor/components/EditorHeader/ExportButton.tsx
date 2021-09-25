import { DownloadIcon } from '@heroicons/react/outline';
import React, { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import Button from '../../../../components/ui/Button';
import ExternalLink from '../../../../components/ui/ExternalLink';
import NotificationContent from '../../../../components/ui/Notification/NotificationContent';
import useVideos from '../../../../hooks/useVideos';
import classNames from '../../../../utils/classNames';
import { openNewsletterWindow } from '../../../../utils/newsletter';
import { audioState } from '../../state/atoms/audio';
import { audioModalState } from '../../state/atoms/ui';
import useAudioDispatcher from '../../state/dispatchers/audio';

function ExportButton() {
  const { exportVideo } = useVideos();
  const { addToast } = useToasts();
  const { setNewAudio } = useAudioDispatcher();
  const audio = useRecoilValue(audioState);
  const [loading, setLoading] = useState(false);

  const saveAndExportVideo = useCallback(
    async (clipBuffer: Blob) => {
      try {
        setLoading(true);
        const { isNewRegularUser } = await exportVideo(clipBuffer);
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
        const errorText =
          (e as any)?.response?.data?.error || "Something's wrong";
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
    },
    [addToast, exportVideo]
  );

  const handleClickExport = useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const audio = snapshot.getLoadable(audioState).getValue();

        if (!audio) {
          set(audioModalState, {
            visible: true,
            onContinue: (clipBuffer) => {
              setNewAudio(clipBuffer);
              saveAndExportVideo(clipBuffer);
            },
          });
        } else {
          saveAndExportVideo(audio.data);
        }
      },
    [saveAndExportVideo, setNewAudio]
  );

  return (
    <Button
      className={classNames('w-40', audio && 'shadow')}
      loading={loading}
      onClick={handleClickExport}
      icon={DownloadIcon}
      type={audio ? 'primary' : 'gray'}
    >
      Generate video
    </Button>
  );
}

export default ExportButton;
