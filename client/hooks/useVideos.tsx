import { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRecoilCallback } from 'recoil';
import ExternalLink from '../components/ui/ExternalLink';
import NotificationContent from '../components/ui/Notification/NotificationContent';
import { Template } from '../features/editor/interfaces/StageConfig';
import { progressModalState } from '../features/editor/state/atoms/ui';
import { audioSelector } from '../features/editor/state/selectors/audio';
import { templateSelector } from '../features/editor/state/selectors/template';
import { toTemplateJSON } from '../features/editor/utils/template';
import {
  deserializeVideoDTO,
  deserializeVideosDTO,
  ExportVideoDTO,
  VideosDTO,
} from '../interfaces/videos';
import { videoIdsState } from '../state/atoms/videos';
import useVideosDispatcher from '../state/dispatchers/videos';
import { isLoggedInSelector } from '../state/selectors/user';
import {
  pollingVideoIdsSelector,
  videoSelector,
} from '../state/selectors/videos';
import { api, getAuthHeaders } from '../utils/api/api';
import { uuid } from '../utils/uuid';

function useVideos() {
  const { setVideosLoaded } = useVideosDispatcher();
  const { addToast } = useToasts();

  const fetchVideosByIds = useCallback(
    (ids: string[]) =>
      api
        .get<VideosDTO>('/videos', {
          params: {
            ids,
          },
        })
        .then((res) => res.data)
        .then(deserializeVideosDTO)
        .then(setVideosLoaded),
    [setVideosLoaded]
  );

  const fetchInitialVideos = useRecoilCallback(
    ({ snapshot }) => () =>
      snapshot.getPromise(videoIdsState).then(fetchVideosByIds),
    [fetchVideosByIds]
  );

  const fetchPollingVideos = useRecoilCallback(
    ({ snapshot }) => async () => {
      const videos = await snapshot
        .getPromise(pollingVideoIdsSelector)
        .then(fetchVideosByIds);

      const { taskId, visible } = snapshot
        .getLoadable(progressModalState)
        .getValue();

      const exportedVideos = Object.entries(videos);

      if (exportedVideos.length) {
        exportedVideos.forEach(([id, { url, status }]) => {
          if (url && (taskId !== id || !visible)) {
            addToast(
              <NotificationContent title="Finished processing video">
                <ExternalLink to={url} newTab>
                  View it here
                </ExternalLink>
              </NotificationContent>,
              { appearance: 'info', autoDismiss: false }
            );
          }
        });
      }
    },
    [addToast, fetchVideosByIds]
  );

  const exportVideo = useRecoilCallback(
    ({ set, snapshot }) => async (audioBuffer?: Blob, template?: Template) => {
      const pregeneratedId = uuid('__export');
      try {
        set(progressModalState, { visible: true, taskId: pregeneratedId });
        const isLoggedIn = snapshot.getLoadable(isLoggedInSelector).getValue();
        const [templateJSON, currentAudio, headers] = await Promise.all([
          toTemplateJSON(
            template ?? (await snapshot.getPromise(templateSelector))
          ),
          audioBuffer ??
            (await snapshot
              .getPromise(audioSelector)
              .then((audio) => audio!.data)),
          isLoggedIn ? getAuthHeaders() : undefined,
        ]);

        if (audioBuffer) {
          set(audioSelector, {
            url: URL.createObjectURL(audioBuffer),
            data: audioBuffer,
          });
        }

        const formData = new FormData();
        formData.set('audio', currentAudio);
        formData.set(
          'template',
          new Blob([templateJSON], {
            type: 'application/json',
          })
        );

        const { data } = await api.post<ExportVideoDTO>('/export', formData, {
          headers,
        });

        set(progressModalState, (state) =>
          state.taskId === pregeneratedId
            ? { ...state, taskId: data.id }
            : state
        );
        set(videoSelector(data.id), deserializeVideoDTO(data.video));

        return data;
      } catch (e) {
        set(progressModalState, (state) =>
          state.taskId === pregeneratedId ? { ...state, error: true } : state
        );
        throw e;
      }
    },
    []
  );

  return {
    exportVideo,
    fetchVideosByIds,
    fetchInitialVideos,
    fetchPollingVideos,
  };
}

export default useVideos;
