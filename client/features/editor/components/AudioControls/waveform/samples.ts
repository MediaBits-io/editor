import { fetchFile } from '@ffmpeg/ffmpeg';
import * as d3 from 'd3';
import { readBlobAsArrayBuffer } from '../../../../../utils/blob';
import { getPcmData } from './pcmData';

export const OUTPUT_FPS = 25;
export const SAMPLES_PER_FRAME = 64; // TODO: Should be based on theme
export const NUM_IFRAMES = 2; // number of interpolated frames in samples

export default async function getSamples(audioUrl: string, duration: number) {
  const numFrames = Math.floor(duration * OUTPUT_FPS);
  const audioCtx = new (window.AudioContext ||
    (window as any).webkitAudioContext)({
    sampleRate: 16000, // TODO: use metadata parser to get sample rate
  });
  const blob = await (await fetch(audioUrl)).blob();
  const arrayBuffer = await readBlobAsArrayBuffer(blob);
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const bytes = await fetchFile(audioUrl);
  const samples = await getPcmData(bytes, {
    channels: audioBuffer.numberOfChannels,
    sampleRate: audioBuffer.sampleRate,
  });

  return processSamples(samples, NUM_IFRAMES, numFrames, SAMPLES_PER_FRAME);
}

function processSamples(
  samples: number[],
  iFrames: number,
  numFrames: number,
  samplesPerFrame: number
) {
  const numKeyFrames = 1 + Math.ceil((numFrames - 1) / (iFrames + 1));
  const perFrame = Math.floor(samples.length / numKeyFrames);
  const perPoint = Math.floor(perFrame / samplesPerFrame);
  const range = d3.range(samplesPerFrame);
  let maxRms = 0;
  let maxMid = 0;

  const unadjusted = d3.range(numKeyFrames).map((frame) => {
    const frameSamples = samples.slice(
      frame * perFrame,
      (frame + 1) * perFrame
    );

    const points = range.map((point) => {
      const pointSamples = frameSamples.slice(
        point * perPoint,
        (point + 1) * perPoint
      );
      const midpoint = pointSamples[Math.floor(pointSamples.length / 2)];

      // Get non-negative average of point samples for min-max
      const rms = Math.sqrt(d3.sum(pointSamples.map((d) => d * d)) / perPoint);

      if (rms > maxRms) {
        maxRms = rms;
      }

      if (Math.abs(midpoint) > maxMid) {
        maxMid = Math.abs(midpoint);
      }

      // Min value, max value, and midpoint value
      return [rms, midpoint];
    });

    return points;
  });

  const adjusted = unadjusted.map((frame) => {
    return frame.map((point) => [point[0] / maxRms, point[1] / maxMid]);
  });

  const interpolated: number[][][] = [];

  for (let i = 1; i < adjusted.length; i++) {
    const prevKeyFrame = adjusted[i - 1];
    const nextKeyFrame = adjusted[i];
    const pointDiffs = prevKeyFrame.map(([prevRms, prevMid], j) => {
      const [nextRms, nextMid] = nextKeyFrame[j];
      return [nextRms - prevRms, nextMid - prevMid];
    });

    interpolated.push(prevKeyFrame);

    // If near the end, we don't want extra frames
    const numIFrames = Math.min(
      iFrames,
      numFrames - (i + (i - 1) * iFrames) - 1
    );

    for (let k = 1; k <= numIFrames; k++) {
      const part = k / (numIFrames + 1);
      const iFrame = prevKeyFrame.map(([rms, midpoint], j) => [
        rms + part * pointDiffs[j][0],
        midpoint + part * pointDiffs[j][1],
      ]);
      interpolated.push(iFrame);
    }
  }

  interpolated.push(adjusted[adjusted.length - 1]);

  return interpolated;
}
