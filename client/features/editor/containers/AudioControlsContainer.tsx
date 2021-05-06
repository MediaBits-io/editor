import { useRef } from 'react';
import { createContainer } from 'unstated-next';
import type WaveSurfer from 'wavesurfer.js';

function useAudioControlsContainer() {
  const wavesurferRef = useRef<WaveSurfer>();

  return {
    wavesurferRef,
  };
}

export const AudioControlsContainer = createContainer(
  useAudioControlsContainer
);
