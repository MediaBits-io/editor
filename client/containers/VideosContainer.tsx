import { useEffect, useRef, useCallback } from 'react';
import { createContainer } from 'unstated-next';
import { api } from '../utils/api';
import { useToasts } from 'react-toast-notifications';
import { Template } from '../features/editor/interfaces/StageConfig';
import { toTemplateJSON } from '../features/editor/utils/template';
import NotificationContent from '../components/ui/Notification/NotificationContent';
import ExternalLink from '../components/ui/ExternalLink';
import { isTruthy } from '../utils/boolean';

export interface VideoDTO {
  date: string;
  duration: number;
  title?: string;
  url?: string;
}

export interface Video extends Omit<VideoDTO, 'date'> {
  date: Date;
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
      date: new Date(video.date),
    };
    return res;
  }, {});

function useVideos() {
  const pollingIdsRef = useRef<string[]>([]);
  const pollingIntervalRef = useRef<any>();
  const { addToast } = useToasts();

  const startPollingInterval = useCallback(() => {
    pollingIntervalRef.current = setInterval(async () => {
      const res = await api.get<VideosDTO>('/videos', {
        params: {
          ids: pollingIdsRef.current,
        },
      });
      const videos = deserializeResponse(res.data);
      const exportedVideos = Object.values(videos)
        .map(({ url }) => url)
        .filter(isTruthy);

      console.log(exportedVideos, videos);

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

        pollingIdsRef.current = pollingIdsRef.current.filter(
          (id) => !videos[id]?.url
        );
        if (!pollingIdsRef.current.length) {
          clearInterval(pollingIntervalRef.current);
        }
      }
    }, 3000);
  }, [addToast]);

  const pollVideo = useCallback(
    (id: string) => {
      pollingIdsRef.current.push(id);

      if (!pollingIntervalRef.current) {
        startPollingInterval();
      }
    },
    [startPollingInterval]
  );

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
    // TODO: get auth headers if pro

    formData.set('audio', audioBuffer);
    formData.set(
      'template',
      new Blob([await toTemplateJSON(template)], {
        type: 'application/json',
      })
    );

    const {
      data: { id },
    } = await api.post<{ id: string; duration: number }>('/export', formData);

    pollVideo(id);
  };

  return {
    exportVideo,
  };
}

export const VideosContainer = createContainer(useVideos);
