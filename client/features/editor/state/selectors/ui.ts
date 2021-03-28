import { selector } from 'recoil';
import { Video } from '../../../../interfaces/videos';
import { videoState } from '../../../../state/atoms/videos';
import { progressModalState } from '../atoms/ui';

export const progressVideoSelector = selector<Video | undefined>({
  key: 'generatingVideoSelector',
  get: ({ get }) => {
    const { taskId } = get(progressModalState);
    return taskId ? get(videoState(taskId)) : undefined;
  },
});
