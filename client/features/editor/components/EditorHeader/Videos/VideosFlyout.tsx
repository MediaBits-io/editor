import { ClockOutline, VideoCameraOutline } from 'heroicons-react';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Flyout from '../../../../../components/ui/Flyout';
import Loader from '../../../../../components/ui/Loader/Loader';
import Popover from '../../../../../components/ui/Popover/Popover';
import { areVideosLoadedState } from '../../../../../state/atoms/videos';
import useVideosDispatcher from '../../../../../state/dispatchers/videos';
import {
  generatedVideoIdsSelector,
  pollingVideoIdsSelector,
} from '../../../../../state/selectors/videos';
import classNames from '../../../../../utils/classNames';
import VideosGrid from './VideosGrid';

interface Props {
  isOpen: boolean;
  close: () => void;
  targetElement: HTMLElement | null;
}

// TODO: add loading on video Ids
function VideosFlyout({ close, isOpen, targetElement }: Props) {
  const pendingVideoIds = useRecoilValue(pollingVideoIdsSelector);
  const generatedVideoIds = useRecoilValue(generatedVideoIdsSelector);
  const areVideosLoaded = useRecoilValue(areVideosLoadedState);
  const { updateLastSeenVideos } = useVideosDispatcher();
  const pendingCount = pendingVideoIds.length;
  const generatedCount = generatedVideoIds.length;

  useEffect(() => {
    if (isOpen) {
      updateLastSeenVideos();
    }
  }, [isOpen, updateLastSeenVideos]);

  return (
    <Flyout
      placement="bottom"
      className="p-3 space-y-2"
      wrapperClass={classNames(
        'w-full',
        generatedCount <= 1 ? 'max-w-xs' : 'max-w-md'
      )}
      targetElement={targetElement}
      isOpen={isOpen}
      close={close}
    >
      <div className="flex items-baseline justify-between mb-2 font-medium">
        <h2 className="leading-6">Videos in the last 24h</h2>
        <div className="text-gray-500 text-sm ml-2 space-x-2 flex">
          {pendingCount > 0 && (
            <Popover
              content="Pending videos"
              placement="top"
              className="flex items-center"
            >
              {pendingCount}
              <ClockOutline className="h-4 w-4 ml-0.5" />
            </Popover>
          )}
          {generatedCount > 0 && (
            <Popover
              content="Recent videos"
              placement="top"
              className="flex items-center"
            >
              {generatedCount}
              <VideoCameraOutline className="h-4 w-4 ml-0.5" />
            </Popover>
          )}
        </div>
      </div>
      {areVideosLoaded ? (
        <VideosGrid />
      ) : (
        <Loader className="my-6 text-gray-400" />
      )}
    </Flyout>
  );
}

export default VideosFlyout;
