import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  PauseIcon,
  PlayIcon,
  ChevronDoubleLeftIcon,
} from '@heroicons/react/solid';
import IMask from 'imask';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import Button from '../../../../components/ui/Button';
import TimestampInput from './TimestampInput';
import useThrottle from '../../../../utils/hooks/useThrottle';
import {
  dateToSeconds,
  dateToTimeString,
  formatDuration,
  secondsToDate,
} from '../../../../utils/time';

interface Props {
  audioFile: Blob;
  onChange: (bounds: {
    startPart: number;
    endPart: number;
    duration: number;
  }) => void;
  minDuration?: number;
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

// TODO: fix imask emitting onChange when value changes / region resize slow
function Waveform({
  audioFile,
  onChange,
  setLoading,
  isLoading,
  minDuration = 3,
}: Props) {
  const zoomRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState('00:00:00.000');
  const [endTime, setEndTime] = useState('00:00:15.000');

  const updateRegionRange = useThrottle(
    useCallback((region: any) => {
      setStartTime(dateToTimeString(secondsToDate(region.start)));
      setEndTime(dateToTimeString(secondsToDate(region.end)));
    }, []),
    50
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setLoading(true);

    const container = containerRef.current;

    const init = async () => {
      const WaveSurfer = (await import('wavesurfer.js')).default;
      wavesurferRef.current = WaveSurfer.create({
        container,
        waveColor: 'white',
        cursorColor: 'transparent',
        progressColor: '#fce96a',
        partialRender: true,
        normalize: true,
        forceDecode: true,
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
    };

    init();

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioFile, minDuration, onChange, setLoading, updateRegionRange]);

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
    const seconds = dateToSeconds(mask.typedValue);

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
    const seconds = dateToSeconds(mask.typedValue);

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
    <div className="space-y-4">
      <div onWheel={handleWheel} className="relative">
        <div ref={containerRef} />
        <div ref={timelineRef} />
      </div>
      {!isLoading && (
        <div className="flex items-end justify-between">
          <div className="flex items-center">
            <Button
              icon={isPlaying ? PauseIcon : PlayIcon}
              onClick={handleClickPlayPause}
              round
            />
            <Button
              type="custom"
              className="h-8 w-8 ml-2 py-2 border focus:ring-blue-300 focus:outline-none focus:ring-2 border-gray-500 bg-gray-600 text-gray-100 hover:bg-gray-500 hover:text-white"
              icon={ChevronDoubleLeftIcon}
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
      )}
    </div>
  );
}

export default Waveform;
