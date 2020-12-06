import * as helpers from './helpers';

function useAudioClipper(audioFile?: Blob) {
  const clipAudio = async (startPart: number, endPart: number) => {
    if (!audioFile) {
      throw new Error('Audio file for clipping is missing');
    }

    return helpers.clipAudio(audioFile, startPart, endPart);
  };

  return { clipAudio };
}

export default useAudioClipper;
