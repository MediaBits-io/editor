import { atom } from 'recoil';
import { AudioState } from '../../interfaces/Audio';
import { historyEffect } from '../effects/HistoryController';

export const audioState = atom<AudioState | undefined>({
  key: 'audioState',
  default: undefined,
  effects_UNSTABLE: [historyEffect],
});
