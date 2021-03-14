import { useEffect, useRef, useCallback, useState } from 'react';
import { createContainer } from 'unstated-next';
import { api, getAuthHeaders } from '../utils/api/api';
import { useToasts } from 'react-toast-notifications';
import { Template } from '../features/editor/interfaces/StageConfig';
import { toTemplateJSON } from '../features/editor/utils/template';
import NotificationContent from '../components/ui/Notification/NotificationContent';
import ExternalLink from '../components/ui/ExternalLink';
import { isTruthy } from '../utils/boolean';
import useLocalStorage from '../utils/hooks/useLocalStorage';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../state/user';

export interface VideoDTO {
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
  duration: number;
  url?: string;
}

export interface Video
  extends Omit<VideoDTO, 'createdAt' | 'deletedAt' | 'updatedAt'> {
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface VideosDTO {
  [id: string]: VideoDTO;
}

export interface Videos {
  [id: string]: Video;
}

const deserializeResponse = (videos: VideosDTO): Videos =>
  Object.entries(videos).reduce<Videos>((res, [id, video]) => {
    res[id] = {
      ...video,
      createdAt: new Date(video.createdAt),
      updatedAt: video.updatedAt ? new Date(video.updatedAt) : undefined,
      deletedAt: video.deletedAt ? new Date(video.deletedAt) : undefined,
    };
    return res;
  }, {});

function useVideos() {
  const userInfo = useRecoilValue(userInfoState);
  const pollingIdsRef = useRef<string[]>([]);
  const pollingIntervalRef = useRef<any>();
  const [videos, setVideos] = useState<Videos>();
  const { addToast } = useToasts();
  const storage = useLocalStorage();

  const updatePolling = useCallback(
    (videos: Videos) => {
      pollingIdsRef.current = pollingIdsRef.current.filter(
        (id) => !videos[id] || (!videos[id].url && !videos[id].deletedAt)
      );
      storage.set<string[]>('polling', pollingIdsRef.current);
      if (!pollingIdsRef.current.length && pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = undefined;
      }
    },
    [storage]
  );

  const fetchPendingVideos = useCallback(
    async (ids: string[]) => {
      let videos: Videos;

      if (ids.length) {
        const res = await api.get<VideosDTO>('/videos', {
          params: {
            ids,
          },
        });
        videos = deserializeResponse(res.data);
      } else {
        videos = {};
      }

      updatePolling(videos);

      const availableVideos = Object.entries(videos).reduce(
        (obj, [id, video]) => {
          if (!video.deletedAt) {
            obj[id] = video;
          }
          return obj;
        },
        {} as Videos
      );

      setVideos((old) => ({ ...old, ...availableVideos }));
      return availableVideos;
    },
    [updatePolling]
  );

  const startPollingInterval = useCallback(() => {
    pollingIntervalRef.current = setInterval(async () => {
      const videos = await fetchPendingVideos(pollingIdsRef.current);

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
    }, 3000);
  }, [addToast, fetchPendingVideos]);

  const pollVideo = useCallback(
    (id: string) => {
      pollingIdsRef.current.push(id);
      storage.set<string[]>('polling', pollingIdsRef.current);

      if (!pollingIntervalRef.current) {
        startPollingInterval();
      }
    },
    [startPollingInterval, storage]
  );

  useEffect(() => {
    pollingIdsRef.current = storage.get<string[]>('polling') ?? [];
    const videos = storage.get<string[]>('videos') ?? [];
    const allPending = new Set([...videos, ...pollingIdsRef.current]);

    if (allPending.size) {
      fetchPendingVideos(Array.from(allPending))
        .catch((err) => {
          console.error(err);
          addToast('Failed to generate video, try again later', {
            appearance: 'error',
          });
        })
        .finally(() => {
          startPollingInterval();
        });
    } else {
      setVideos({});
    }
  }, [addToast, fetchPendingVideos, startPollingInterval, storage]);

  useEffect(() => {
    storage.set('videos', videos ? Object.keys(videos) : []);
  }, [storage, videos]);

  // Stop all polling on unmount
  useEffect(
    () => () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    },
    []
  );

  const exportVideo = async (audioBuffer: Blob, template: Template) => {
    const formData = new FormData();

    formData.set('audio', audioBuffer);
    formData.set(
      'template',
      new Blob([await toTemplateJSON(template)], {
        type: 'application/json',
      })
    );

    const headers = userInfo && (await getAuthHeaders());

    const { data } = await api.post<{
      id: string;
      duration: number;
      isNewRegularUser: boolean;
    }>('/export', formData, {
      headers,
    });

    pollVideo(data.id);

    return data;
  };

  return {
    exportVideo,
    videos,
  };
}

export const VideosContainer = createContainer(useVideos);
