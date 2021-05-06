import { createFFmpeg } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
});

interface Options {
  channels?: number;
  sampleRate?: number;
}

/**
 * Takes a file containing an audio stream and returns raw PCM data
 * asynchronously using ffmpeg.
 * @param {String} filename file to extract audio from.
 * @param {Object} options optional object holding boolean stereo and integer
 *        sampleRate parameters.
 */
export async function getPcmData(
  buffer: Uint8Array,
  { channels = 2, sampleRate = 44100 }: Options
) {
  const filename = 'audio.mp3';

  console.log('BUFFER', buffer);

  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }
  ffmpeg.FS('writeFile', filename, buffer);

  // Extract signed 16-bit little endian PCM data with ffmpeg
  await ffmpeg.run(
    '-i',
    filename,
    '-f',
    's16le',
    '-ac',
    `${channels}`,
    '-acodec',
    'pcm_s16le',
    '-ar',
    `${sampleRate}`,
    '-y',
    'out.pcm'
  );

  const data = ffmpeg.FS('readFile', 'out.pcm');
  const samples: number[] = [];

  let channel = 0;
  // TODO: account for big-endian system
  for (let i = 0; i < data.length; i += 2) {
    const sample = ((data[i + 1] << 8) | data[i]) / 32767.0;

    // Average multiple channels
    if (channel > 0) {
      samples[samples.length - 1] =
        (samples[samples.length - 1] * channel + sample) / (channel + 1);
    } else {
      samples.push(sample);
    }

    channel = ++channel % 2;
  }

  return samples;
}
