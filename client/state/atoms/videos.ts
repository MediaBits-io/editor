import { atom, atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Video } from '../../interfaces/videos';

const { persistAtom } = recoilPersist({ key: 'mediabits_videos' });

export const areVideosLoadedState = atom<boolean>({
  key: 'areVideosLoadedState',
  default: false,
});

export const videoIdsState = atom<string[]>({
  key: 'videoIdsState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const videoState = atomFamily<Video, string>({
  key: 'videoState',
  default: {} as Video,
});
