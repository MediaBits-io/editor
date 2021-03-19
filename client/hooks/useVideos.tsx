import { useCallback } from 'react';
import { api, getAuthHeaders } from '../utils/api/api';
import { Template } from '../features/editor/interfaces/StageConfig';
import { toTemplateJSON } from '../features/editor/utils/template';
import { useRecoilCallback } from 'recoil';
import {
  deserializeVideoDTO,
  deserializeVideosDTO,
  ExportVideoDTO,
  VideosDTO,
} from '../interfaces/videos';
import {
  pollingVideoIdsSelector,
  videoSelector,
} from '../state/selectors/videos';
import useVideosDispatcher from '../state/dispatchers/videos';
import { videoIdsState } from '../state/atoms/videos';
import { isTruthy } from '../utils/boolean';
import { useToasts } from 'react-toast-notifications';
import NotificationContent from '../components/ui/Notification/NotificationContent';
import ExternalLink from '../components/ui/ExternalLink';

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

      const exportedVideos = Object.values(videos)
        .map(({ url }) => url)
        .filter(isTruthy);

      if (exportedVideos.length) {
        exportedVideos.forEach((url) => {
          addToast(
            <NotificationContent title="Finished processing video">
              <ExternalLink to={url} newTab>
                View it here
              </ExternalLink>
            </NotificationContent>,
            { appearance: 'info', autoDismiss: false }
          );
        });
      }
    },
    [addToast, fetchVideosByIds]
  );

  const exportVideo = useRecoilCallback(
    ({ set }) => async (audioBuffer: Blob, template: Template) => {
      const [headers, templateJSON] = await Promise.all([
        getAuthHeaders(),
        toTemplateJSON(template),
      ]);

      const formData = new FormData();
      formData.set('audio', audioBuffer);
      formData.set(
        'template',
        new Blob([templateJSON], {
          type: 'application/json',
        })
      );

      const { data } = await api.post<ExportVideoDTO>('/export', formData, {
        headers,
      });

      set(videoSelector(data.id), deserializeVideoDTO(data.video));

      return data;
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
