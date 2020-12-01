import * as helpers from './helpers';

function useAudioClipper(audioFile?: File) {
  const clipAudio = async (startPart: number, endPart: number) => {
    if (!audioFile) {
      throw new Error('Audio file for clipping is missing');
    }

    return helpers.clipAudio(audioFile, startPart, endPart);
  };

  return { clipAudio };
}

export default useAudioClipper;
