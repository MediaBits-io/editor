import { useRecoilCallback } from 'recoil';
import { audioState } from '../atoms/audio';

function useAudioDispatcher() {
  const setNewAudio = useRecoilCallback(
    ({ set }) => (clipBuffer: Blob) => {
      set(audioState, {
        data: clipBuffer,
        url: URL.createObjectURL(clipBuffer),
      });
    },
    []
  );

  return { setNewAudio };
}

export default useAudioDispatcher;
