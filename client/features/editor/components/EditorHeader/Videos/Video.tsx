import { Transition } from '@headlessui/react';
import { Pause, Play } from 'heroicons-react';
import React, { useEffect, useRef, useState } from 'react';
import AspectRatio from 'react-aspect-ratio';
import Button from '../../../../../components/ui/Button';

interface Props {
  url: string;
}

function Video({ url }: Props) {
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

  const handleTogglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
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
          <source src={url} type="video/mp4" />
        </video>
        <Transition
          show={showControls}
          enter="transition duration-150"
          enterFrom="transform opacity-0"
          leave="transition duration-90"
          enterTo="transform opacity-0"
          leaveFrom="transform opacity-90"
          leaveTo="transform opacity-0"
        >
          <div className="p-2 bg-gray-800 absolute bottom-0 left-0 right-0">
            <Button
              round
              icon={isPlaying ? Pause : Play}
              onClick={handleTogglePlay}
            />
          </div>
        </Transition>
      </div>
    </AspectRatio>
  );
}

export default Video;
