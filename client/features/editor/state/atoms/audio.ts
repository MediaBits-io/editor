import { atom } from 'recoil';
import { AudioState } from '../../interfaces/Audio';
import { historyEffect } from '../effects/history';

export const audioState = atom<AudioState | undefined>({
  key: 'audioState',
  default: undefined,
  effects_UNSTABLE: [historyEffect],
});

export const audioProgressState = atom({
  key: 'audioProgressState',
  default: 0,
});

export const waveformFramesState = atom<number[][][] | undefined>({
  key: 'waveformFramesState',
  default: undefined,
});
