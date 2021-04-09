import { Transition } from '@headlessui/react';
import { PauseIcon, PlayIcon } from '@heroicons/react/solid';
import { DownloadIcon } from '@heroicons/react/outline';
import React, { useEffect, useRef, useState } from 'react';
import AspectRatio from 'react-aspect-ratio';
import { saveAs } from 'file-saver';
import Button from '../../../../../components/ui/Button';
import { useRecoilValue } from 'recoil';
import { videoSelector } from '../../../../../state/selectors/videos';

interface Props {
  id: string;
}

function Video({ id }: Props) {
  const video = useRecoilValue(videoSelector(id));
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [isPlaying, setPlaying] = useState(false);

  useEffect(() => {
    const element = videoRef.current;

    if (!element) {
      return;
    }

    const playHandler = () => {
      setPlaying(true);
    };

    const stopHandler = () => {
      setPlaying(false);
    };

    element.addEventListener('play', playHandler);
    element.addEventListener('pause', stopHandler);
    element.addEventListener('ended', stopHandler);

    return () => {
      element.removeEventListener('play', playHandler);
      element.removeEventListener('play', stopHandler);
      element.removeEventListener('ended', stopHandler);
    };
  }, []);

  if (!video) {
    return null;
  }

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  const handleClickDownload = () => {
    if (video.url) {
      saveAs(video.url, 'video.mp4');
    }
  };

  return (
    <AspectRatio ratio={1}>
      <div
        onMouseOver={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        className="relative rounded shadow hover:shadow-md overflow-hidden focus:shadow-md focus:outline-none transition duration-150"
      >
        <video
          ref={videoRef}
          className="rounded flex justify-center items-center w-full h-full bg-gray-50"
        >
          <source src={video.url} type="video/mp4" />
        </video>
        <Transition
          show={showControls}
          enter="transition duration-150"
          enterFrom="transform opacity-0"
          enterTo="transform opacity-100"
          leave="transition duration-150"
          leaveFrom="transform opacity-100"
          leaveTo="transform opacity-0"
        >
          <div className="absolute left-0 right-0 bottom-0 p-2 space-x-1">
            <Button
              round
              type="dark"
              icon={isPlaying ? PauseIcon : PlayIcon}
              title={isPlaying ? 'Pause' : 'Play'}
              onClick={handleTogglePlay}
            />
            <Button
              className="h-8 w-8"
              round
              type="secondary"
              onClick={handleClickDownload}
              icon={DownloadIcon}
              title="Download"
            />
          </div>
        </Transition>
      </div>
    </AspectRatio>
  );
}

export default Video;
