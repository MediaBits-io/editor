import { DefaultValue, selector, selectorFamily } from 'recoil';
import { TaskStatus, Video } from '../../interfaces/videos';
import { videoIdsState, videoState } from '../atoms/videos';

export const videoSelector = selectorFamily<Video | undefined, string>({
  key: 'videoSelector',
  get: (videoId) => ({ get }) => get(videoState(videoId)),
  set: (videoId) => ({ set, reset }, video) => {
    if (!video || video instanceof DefaultValue || video.deletedAt) {
      reset(videoState(videoId));
      set(videoIdsState, (ids) => ids.filter((id) => id !== videoId));
      return;
    }
    set(videoState(videoId), video);
    set(videoIdsState, (ids) =>
      ids.includes(videoId) ? ids : [...ids, videoId]
    );
  },
});

export const pollingVideoIdsSelector = selector<string[]>({
  key: 'pollingVideoIdsSelector',
  get: ({ get }) => {
    return get(videoIdsState).filter((id) => {
      const { deletedAt, status } = get(videoState(id));
      return (
        !deletedAt && ![TaskStatus.DONE, TaskStatus.ERROR].includes(status)
      );
    });
  },
});

export const generatedVideoIdsSelector = selector<string[]>({
  key: 'generatedVideoIdsSelector',
  get: ({ get }) => {
    return get(videoIdsState).filter((id) => {
      const { deletedAt, status } = get(videoState(id));
      return !deletedAt && status === TaskStatus.DONE;
    });
  },
});

export const sortedVideoIdsSelector = selector<string[]>({
  key: 'sortedVideoIdsSelector',
  get: ({ get }) => {
    return get(generatedVideoIdsSelector)
      .map((id) => ({ id, video: get(videoState(id)) }))
      .sort((a, b) => b.video.createdAt.getTime() - a.video.createdAt.getTime())
      .map(({ id }) => id);
  },
});
