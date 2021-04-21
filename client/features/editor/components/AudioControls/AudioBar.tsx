import { PauseIcon, PlayIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import CursorPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.cursor';
import Loader from '../../../../components/ui/Loader/Loader';
import Tooltip from '../../../../components/ui/Tooltip/Tooltip';
import ClearButton from '../ui/ClearButton';

interface Props {
  audioUrl: string;
}

function AudioBar({ audioUrl }: Props) {
  const [isLoading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer>();
  const [isPlaying, setIsPlaying] = useState(false);

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
        cursorColor: 'transparent',
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

      const handleReady = () => {
        setLoading(false);
      };

      const handleTogglePlay = () => {
        if (wavesurferRef.current) {
          setIsPlaying(wavesurferRef.current.isPlaying());
        }
      };

      wavesurferRef.current.on('ready', handleReady);
      wavesurferRef.current.on('pause', handleTogglePlay);
      wavesurferRef.current.on('play', handleTogglePlay);
    };

    init();

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl, setLoading]);

  const handleClickPlayPause = async () => {
    if (wavesurferRef.current) {
      await wavesurferRef.current.playPause();
    }
  };

  return (
    <div className="flex flex-1">
      <div className="flex items-center mr-2">
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
      <div className="flex w-full justify-center items-center max-h-full bg-gray-50 border text-gray-400 rounded-md py-0.5 px-1">
        {isLoading && (
          <div className="absolute flex">
            <Loader />
            <span className="ml-2 text-sm">Analyzing audio...</span>
          </div>
        )}
        <div ref={containerRef} className="audio-bar relative w-full" />
      </div>
    </div>
  );
}

export default AudioBar;
