import { slice } from 'audio-buffer-utils';
import { readBlobAsArrayBuffer } from '../../../../utils/blob';
import instantiate from '@etercast/mp3';

// TODO: Move audio clipping to web worker to prevent blocking
// TODO: detect audio sample rate instead of hard coding 44100 (browsers missing APIs)

/**
 * @param audioFile Blob or File to audio
 * @param startPart [0..1] of file duration to start at
 * @param endPart [0..1] of file duration to end at
 */
export async function clipAudio(
  audioFile: Blob,
  startPart: number,
  endPart: number
) {
  const audioCtx = new (window.AudioContext ||
    (window as any).webkitAudioContext)({
    sampleRate: 44100,
  });
  const [Encoder, originalArrayBuffer] = await Promise.all([
    await instantiate(),
    await readBlobAsArrayBuffer(audioFile),
  ]);

  const originalAudioBuffer = await audioCtx.decodeAudioData(
    originalArrayBuffer
  );

  const startByte =
    startPart * originalAudioBuffer.duration * originalAudioBuffer.sampleRate;
  const endByte =
    endPart * originalAudioBuffer.duration * originalAudioBuffer.sampleRate;

  const clipAudioBuffer: AudioBuffer = slice(
    originalAudioBuffer,
    startByte,
    endByte
  );

  const leftChannelData = clipAudioBuffer.getChannelData(0);
  const rightChannelData =
    clipAudioBuffer.numberOfChannels > 1
      ? clipAudioBuffer.getChannelData(1)
      : null;

  const samples = 16384;

  const encoder = new Encoder({
    samples,
    sampleRate: clipAudioBuffer.sampleRate,
    numChannels: 2,
  });

  const numOfChunks = Math.floor(leftChannelData.length / samples) + 1;
  const encodedFrames = [];

  for (let i = 0; i < numOfChunks; i++) {
    encodedFrames.push(
      encoder.encode(
        leftChannelData.slice(i * samples, (i + 1) * samples),
        rightChannelData?.slice(i * samples, (i + 1) * samples)
      )
    );
  }
  encodedFrames.push(encoder.encode());

  const blob = new Blob(encodedFrames, {
    type: 'audio/mp3',
  });

  return blob;
}