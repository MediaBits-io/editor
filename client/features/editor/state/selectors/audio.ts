import { DefaultValue, selector } from 'recoil';
import { AudioState } from '../../interfaces/Audio';
import { audioState } from '../atoms/audio';

export const audioSelector = selector<AudioState | undefined>({
  key: 'audioSelector',
  get: ({ get }) => get(audioState),
  set: ({ get, set, reset }, newAudioState) => {
    const currentAudioState = get(audioState);

    // if (currentAudioState) {
    //   URL.revokeObjectURL(currentAudioState.url);
    // }

    if (newAudioState instanceof DefaultValue) {
      reset(audioState);
    } else {
      set(audioState, newAudioState);
    }
  },
});
