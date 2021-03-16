import { useMemo } from 'react';
import { api, getAuthHeaders } from '../utils/api/api';
import { Template } from '../features/editor/interfaces/StageConfig';
import { toTemplateJSON } from '../features/editor/utils/template';
import { useRecoilCallback } from 'recoil';
import { deserializeVideoDTO, ExportVideoDTO } from '../interfaces/videos';
import { videoSelector } from '../state/videos';

function useVideos() {
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

  return useMemo(
    () => ({
      exportVideo,
    }),
    [exportVideo]
  );
}

export default useVideos;
