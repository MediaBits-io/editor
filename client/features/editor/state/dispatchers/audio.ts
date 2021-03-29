import { useRecoilCallback } from 'recoil';
import { audioSelector } from '../selectors/audio';

function useAudioDispatcher() {
  const setNewAudio = useRecoilCallback(
    ({ set }) => (clipBuffer: Blob) => {
      set(audioSelector, {
        data: clipBuffer,
        url: URL.createObjectURL(clipBuffer),
      });
    },
    []
  );

  return { setNewAudio };
}

export default useAudioDispatcher;
