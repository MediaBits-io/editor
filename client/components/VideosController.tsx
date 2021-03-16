import { useCallback, useEffect, useRef } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { deserializeVideosDTO, VideosDTO } from '../interfaces/videos';
import {
  pollingVideoIdsSelector,
  videoIdsState,
  videoSelector,
  areVideosLoadedState,
} from '../state/videos';
import { api } from '../utils/api/api';
import { isTruthy } from '../utils/boolean';
import ExternalLink from './ui/ExternalLink';
import NotificationContent from './ui/Notification/NotificationContent';

function VideosController() {
  const pollingIds = useRecoilValue(pollingVideoIdsSelector);
  const intervalRef = useRef<any>();
  const { addToast } = useToasts();

  const fetchVideosByIds = useRecoilCallback(
    ({ set }) => async (ids: string[]) => {
      const videos = ids.length
        ? await api
            .get<VideosDTO>('/videos', {
              params: {
                ids,
              },
            })
            .then((res) => res.data)
            .then(deserializeVideosDTO)
        : {};

      set(areVideosLoadedState, true);

      return Object.entries(videos).map(([id, video]) => {
        set(videoSelector(id), video);
        return video;
      });
    },
    []
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

      const exportedVideos = videos.map(({ url }) => url).filter(isTruthy);

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

  const startPolling = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchPollingVideos, 3000);
    }
  }, [fetchPollingVideos]);

  const stopPolling = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  useEffect(() => {
    if (pollingIds.length) {
      startPolling();
    } else {
      stopPolling();
    }
  }, [pollingIds, startPolling, stopPolling]);

  useEffect(() => {
    fetchInitialVideos();
    return stopPolling;
  }, [fetchInitialVideos, startPolling, stopPolling]);

  return null;
}

export default VideosController;
