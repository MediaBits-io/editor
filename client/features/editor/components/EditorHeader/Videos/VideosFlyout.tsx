import React, { useMemo } from 'react';
import Flyout from '../../../../../components/ui/Flyout';
import Loader from '../../../../../components/ui/Loader/Loader';
import { VideosContainer } from '../../../../../containers/VideosContainer';
import classNames from '../../../../../utils/classNames';
import VideosGrid from './VideosGrid';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

function VideosFlyout({ close, isOpen, targetElement }: Props) {
  const { videos } = VideosContainer.useContainer();

  const videosArr = useMemo(() => Object.values(videos ?? []), [videos]);
  const generatedVideos = useMemo(() => videosArr.filter(({ url }) => url), [
    videosArr,
  ]);
  const pendingCount = useMemo(
    () => videosArr.reduce((sum, video) => (video.url ? sum : sum + 1), 0),
    [videosArr]
  );

  return (
    <Flyout
      placement="bottom"
      className="p-3 space-y-2"
      wrapperClass={classNames(
        'w-full',
        generatedVideos.length === 1 ? 'max-w-xs' : 'max-w-md'
      )}
      targetElement={targetElement}
      isOpen={isOpen}
      close={close}
    >
      <div className="flex items-baseline justify-between mb-2">
        <h2 className="font-medium leading-6">Videos in the last 24h</h2>
        {pendingCount ? (
          <span className="text-gray-500 text-sm ml-2">
            {pendingCount} pending
          </span>
        ) : undefined}
      </div>
      {videos ? (
        <VideosGrid videos={videos} />
      ) : (
        <Loader className="my-6 text-gray-400" />
      )}
    </Flyout>
  );
}

export default VideosFlyout;
