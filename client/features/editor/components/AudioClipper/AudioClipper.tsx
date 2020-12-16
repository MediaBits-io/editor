import React, { useRef, useEffect, useState, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Pause, Play, ChevronDoubleLeft } from 'heroicons-react';
import IMask from 'imask';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Button from '../../../../components/ui/Button';
import TimestampInput from './TimestampInput';
import useThrottle from '../../../../utils/hooks/useThrottle';
import Loader from '../../../../components/ui/Loader/Loader';
import { formatDateToValue, formatDuration } from '../../../../utils/time';

export interface BoxSize {
  width: string | number;
  x: number;
}

interface Props {
  audioFile?: Blob;
  setAudioFile: (file: Blob) => void;
  onChange: (bounds: {
    startPart: number;
    endPart: number;
    duration: number;
  }) => void;
  minDuration?: number;
}

function AudioClipper({
  audioFile,
  setAudioFile,
  onChange,
  minDuration = 3,
}: Props) {
  const zoomRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState('00:00:00.000');
  const [endTime, setEndTime] = useState('00:00:15.000');
  const [isLoading, setLoading] = useState(false);

  const getTime = useCallback((totalSeconds: number) => {
    const seconds = Math.floor(totalSeconds);
    const date = new Date();
    date.setHours(Math.floor(seconds / 3600));
    date.setMinutes(Math.floor((seconds % 3600) / 60));
    date.setSeconds(seconds % 60);
    date.setMilliseconds(
      Math.floor((totalSeconds - Math.floor(totalSeconds)) * 1000)
    );
    return date;
  }, []);

  const updateRegionRange = useThrottle(
    useCallback(
      (region: any) => {
        setStartTime(formatDateToValue(getTime(region.start)));
        setEndTime(formatDateToValue(getTime(region.end)));
      },
      [getTime]
    ),
    50
  );

  useEffect(() => {
    if (!audioFile || !containerRef.current || !process.browser) {
      return;
    }

    setLoading(true);

    wavesurferRef.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: 'white',
      cursorColor: 'transparent',
      progressColor: '#fce96a',
      partialRender: true,
      normalize: true,
      plugins: [
        RegionsPlugin.create({}),
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          color: '#3f83f8',
          customShowTimeStyle: {
            'background-color': '#000000',
            border: '1px solid #3f83f8',
            color: '#ffffff',
            padding: '0.1rem 0.25rem',
            'font-size': '0.75rem',
          },
        }),
        TimelinePlugin.create({
          container: timelineRef.current,
          primaryColor: '#e1effe',
          secondaryColor: '#e1effe',
          primaryFontColor: '#e1effe',
          secondaryFontColor: '#e1effe',
          unlabeledNotchColor: '#64748b',
          formatTimeCallback: formatDuration,
        }),
      ],
    });

    wavesurferRef.current.loadBlob(audioFile);

    const handleRegionUpdate = (region: any) => {
      if (!wavesurferRef.current) {
        return;
      }

      const duration = wavesurferRef.current.getDuration();
      const start = Math.max(region.start, 0);
      const end = Math.max(region.end, start + minDuration);

      if (duration) {
        updateRegionRange({ start, end });
        onChange({
          startPart: start / duration,
          endPart: end / duration,
          duration,
        });
      }

      if (!wavesurferRef.current.isPlaying()) {
        wavesurferRef.current.setCurrentTime(start);
      }
    };

    const handleReady = () => {
      setLoading(false);

      const wavesurfer = wavesurferRef.current;

      if (!wavesurfer) {
        return;
      }

      const duration = wavesurfer.getDuration();
      const start = 0;
      const end = Math.min(duration, start + 15);

      const region = wavesurfer.addRegion({
        start,
        end,
        minLength: minDuration,
        color: 'rgba(63, 131, 248, 0.25)',
        handleStyle: {
          left: {
            minWidth: '2px',
            backgroundColor: 'rgba(63, 131, 248)',
          },
          right: {
            minWidth: '2px',
            backgroundColor: 'rgba(63, 131, 248)',
          },
        },
      });

      updateRegionRange({ start, end });
      onChange({
        startPart: region.start / duration,
        endPart: region.end / duration,
        duration,
      });

      setTimeout(() => {
        const wrapper = wavesurfer.drawer.wrapper;

        if (wrapper) {
          zoomRef.current = wrapper.clientWidth / 30; // Fit 30 seconds to screen
          wavesurfer.zoom(zoomRef.current);
        }
      }, 10);
    };

    const handleTogglePlay = () => {
      if (wavesurferRef.current) {
        setIsPlaying(wavesurferRef.current.isPlaying());
      }
    };

    wavesurferRef.current.on('region-updated', handleRegionUpdate);
    wavesurferRef.current.on('ready', handleReady);
    wavesurferRef.current.on('pause', handleTogglePlay);
    wavesurferRef.current.on('play', handleTogglePlay);

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioFile, minDuration, onChange, updateRegionRange]);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!wavesurferRef.current) {
      return;
    }

    const wrapper = wavesurferRef.current.drawer.wrapper;
    const cursor = wavesurferRef.current.cursor.cursor;
    const offset = cursor.offsetLeft;
    const percentageLeft =
      (wrapper.scrollLeft + cursor.offsetLeft) / wrapper.scrollWidth;

    const inc = e.deltaY < 0 ? 10 : -10;

    zoomRef.current = zoomRef.current + inc;
    if (zoomRef.current < 0) {
      zoomRef.current = 0;
    } else if (zoomRef.current > 1000) {
      zoomRef.current = 1000;
    }

    wavesurferRef.current.zoom(zoomRef.current);

    if (percentageLeft) {
      wrapper.scrollTo({ left: percentageLeft * wrapper.scrollWidth - offset });
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];

    if (file) {
      setAudioFile(file);
    }
  };

  const handleClickImport = () => {
    inputRef.current?.click();
  };

  const handleClickPlayPause = async () => {
    if (wavesurferRef.current) {
      await wavesurferRef.current.playPause();
    }
  };

  const handleSeekToStart = async () => {
    if (wavesurferRef.current) {
      await wavesurferRef.current.pause();
      const region: any = Object.values(wavesurferRef.current.regions.list)[0];
      if (region) {
        wavesurferRef.current.seekAndCenter(
          region.start / wavesurferRef.current.getDuration()
        );
      }
    }
  };

  const handleChangeEnd = (
    value: string,
    mask: IMask.InputMask<IMask.MaskedDateOptions>
  ) => {
    setEndTime(value);

    if (!wavesurferRef.current || !mask.typedValue) {
      return;
    }

    const region: any = Object.values(wavesurferRef.current.regions.list)[0];
    const seconds =
      mask.typedValue.getMilliseconds() / 1000 +
      mask.typedValue.getSeconds() +
      mask.typedValue.getMinutes() * 60 +
      mask.typedValue.getHours() * 3600;

    if (mask.typedValue) {
      region.onResize(seconds - region.end);
    }

    const duration = wavesurferRef.current.getDuration();

    const start = Math.max(region.start, 0);
    const end = Math.max(region.end, start + minDuration);

    onChange({
      startPart: start / duration,
      endPart: end / duration,
      duration,
    });
  };

  const handleChangeStart = (
    value: string,
    mask: IMask.InputMask<IMask.MaskedDateOptions>
  ) => {
    setStartTime(value);

    if (!wavesurferRef.current || !mask.typedValue) {
      return;
    }

    const region: any = Object.values(wavesurferRef.current.regions.list)[0];
    const seconds =
      mask.typedValue.getMilliseconds() / 1000 +
      mask.typedValue.getSeconds() +
      mask.typedValue.getMinutes() * 60 +
      mask.typedValue.getHours() * 3600;

    if (mask.typedValue) {
      region.onDrag(seconds - region.start);
    }

    const duration = wavesurferRef.current.getDuration();

    const start = Math.max(region.start, 0);
    const end = Math.max(region.end, start + minDuration);

    onChange({
      startPart: start / duration,
      endPart: end / duration,
      duration,
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChangeFile}
        className="hidden"
        accept="audio/*"
      />
      <div className="bg-gray-700 shadow-inner overflow-hidden rounded-lg">
        {audioFile ? (
          <>
            <div onWheel={handleWheel} className="relative mx-4 my-4 sm:m-6">
              {isLoading && (
                <Loader className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform" />
              )}
              <div ref={containerRef}></div>
              <div ref={timelineRef}></div>
            </div>
            <div className="m-4 flex items-end justify-between">
              <div className="flex items-center">
                <Button
                  icon={isPlaying ? Pause : Play}
                  onClick={handleClickPlayPause}
                  round
                />
                <Button
                  type="custom"
                  className="h-8 w-8 ml-2 py-2 border focus:ring-blue-300 focus:outline-none focus:ring-2 border-gray-500 bg-gray-600 text-gray-100 hover:bg-gray-500 hover:text-white"
                  icon={ChevronDoubleLeft}
                  onClick={handleSeekToStart}
                  round
                />
              </div>
              <div className="flex items-center">
                <TimestampInput
                  label="Start"
                  value={startTime}
                  onChange={handleChangeStart}
                />
                <TimestampInput
                  label="End"
                  value={endTime}
                  onChange={handleChangeEnd}
                  className="ml-2"
                />
              </div>
            </div>
          </>
        ) : (
          <button
            onClick={handleClickImport}
            className="w-full px-4 py-5 sm:p-6 text-base text-gray-300 hover:text-gray-200"
          >
            <span className="h-32 flex flex-col justify-center text-center">
              <span className="mb-1">Click to select audio</span>
              <span className="text-sm text-gray-500">
                You can trim files up to 50MB
              </span>
            </span>
          </button>
        )}
      </div>
    </>
  );
}

export default AudioClipper;
