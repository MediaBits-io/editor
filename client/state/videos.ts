import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Video } from '../interfaces/videos';
import { isTruthy } from '../utils/boolean';

const { persistAtom } = recoilPersist({ key: 'mediabits_videos' });

export const areVideosLoadedState = atom<boolean>({
  key: 'videosLoaded',
  default: false,
});

export const videoIdsState = atom<string[]>({
  key: 'videoIdsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const videoState = atomFamily<Video | undefined, string>({
  key: 'videoState',
  default: undefined,
});

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
      const video = get(videoState(id));
      return video && !video.deletedAt && !video.url;
    });
  },
});

export const generatedVideoIdsSelector = selector<string[]>({
  key: 'generatedVideoIdsSelector',
  get: ({ get }) => {
    return get(videoIdsState).filter((id) => {
      const video = get(videoState(id));
      return video && !video.deletedAt && video.url;
    });
  },
});

export const sortedVideoIdsSelector = selector<string[]>({
  key: 'sortedVideoIdsSelector',
  get: ({ get }) => {
    return get(generatedVideoIdsSelector)
      .map((id) => ({ id, video: get(videoState(id)) }))
      .filter((arg): arg is { id: string; video: Video } => isTruthy(arg.video))
      .sort((a, b) => b.video.createdAt.getTime() - a.video.createdAt.getTime())
      .map(({ id }) => id);
  },
});
