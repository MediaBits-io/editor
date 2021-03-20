import { atom } from 'recoil';
import { AudioState } from '../../interfaces/Audio';

export const audioState = atom<AudioState | undefined>({
  key: 'audioState',
  default: undefined,
});
