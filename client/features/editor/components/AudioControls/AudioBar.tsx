import { PauseIcon, PlayIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Loader from '../../../../components/ui/Loader/Loader';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import useThrottle from '../../../../utils/hooks/useThrottle';
import { formatTime } from '../../../../utils/time';
import { TARGET_FPS } from '../../constants';
import { audioProgressState } from '../../state/atoms/audio';
import ClearButton from '../ui/ClearButton';

interface Props {
  audioUrl: string;
}

function AudioBar({ audioUrl }: Props) {
  const audioProgress = useRecoilValue(audioProgressState);
  const [isLoading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer>();

  const handleProgress = useThrottle(
    useRecoilCallback(
      ({ set }) => () => {
        const wavesurfer = wavesurferRef.current;
        if (wavesurfer) {
          set(
            audioProgressState,
            Math.floor(wavesurfer.getCurrentTime() * 1000)
          );
        }
      },
      []
    ),
    Math.floor(1000 / TARGET_FPS)
  );

  const handleReady = useRecoilCallback(
    ({ set }) => async () => {
      const wavesurfer = wavesurferRef.current;

      if (wavesurfer) {
        set(audioProgressState, Math.floor(wavesurfer.getCurrentTime() * 1000));
      }

      setLoading(false);
    },
    []
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
        waveColor: '#D1D5DB',
        cursorColor: '#4b5563',
        progressColor: '#4b5563',
        partialRender: true,
        normalize: true,
        height: 30,
        forceDecode: true,
        responsive: true,
        plugins: [
          CursorPlugin.create({
            showTime: true,
            opacity: 1,
            color: '#111827',
            customShowTimeStyle: {
              'background-color': '#111827',
              color: '#ffffff',
              padding: '0.075rem 0.2rem',
              'font-size': '0.75rem',
            },
          }),
        ],
      });

      wavesurferRef.current.load(audioUrl);

      const handleTogglePlay = () => {
        if (wavesurferRef.current) {
          setIsPlaying(wavesurferRef.current.isPlaying());
        }
      };

      wavesurferRef.current.on('ready', handleReady);
      wavesurferRef.current.on('pause', handleTogglePlay);
      wavesurferRef.current.on('play', handleTogglePlay);
      wavesurferRef.current.on('audioprocess', handleProgress);
      wavesurferRef.current.on('seek', () => {
        if (!wavesurferRef.current?.isPlaying()) {
          handleProgress();
        }
      });
    };

    init();

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl, handleProgress, handleReady]);

  const handleClickPlayPause = async () => {
    if (wavesurferRef.current) {
      await wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex items-center mr-1.5">
        <Tooltip
          content={isPlaying ? 'Pause audio' : 'Play audio'}
          placement="bottom"
          className="flex"
        >
          <ClearButton
            icon={isPlaying ? PauseIcon : PlayIcon}
            onClick={handleClickPlayPause}
          />
        </Tooltip>
      </div>
      <div className="flex w-full items-center max-h-full bg-gray-50 border text-gray-400 rounded-md overflow-hidden">
        <div className="h-full flex justify-end items-center w-16 px-1 py-0.5 text-xs border-r font-mono">
          {formatTime(audioProgress)}
        </div>
        <div className="flex w-full justify-center items-center py-0.5 pr-1 max-h-full">
          {isLoading && (
            <div className="absolute flex">
              <Loader />
              <span className="ml-2 text-sm">Analyzing audio...</span>
            </div>
          )}
          <div ref={containerRef} className="audio-bar relative w-full" />
        </div>
      </div>
    </div>
  );
}

export default AudioBar;
