import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Alert from '../../../../../components/ui/Alert';
import { sortedVideoIdsSelector } from '../../../../../state/selectors/videos';
import classNames from '../../../../../utils/classNames';
import Video from './Video';

interface Props {
  visible: boolean;
}

function VideosGrid({ visible }: Props) {
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const sortedVideoIds = useRecoilValue(sortedVideoIdsSelector);

  useEffect(() => {
    if (!visible) {
      Object.values(videoRefs.current).forEach((video) => {
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [visible]);

  return sortedVideoIds.length ? (
    <div
      className={classNames(
        'p-2 grid gap-2 grid-flow-row-dense overflow-y-auto',
        sortedVideoIds.length === 1
          ? 'grid-cols-1 max-h-72'
          : 'grid-cols-2 max-h-52'
      )}
    >
      {sortedVideoIds.map((id) => (
        <Video key={id} id={id} ref={(el) => (videoRefs.current[id] = el)} />
      ))}
    </div>
  ) : (
    <Alert title="No videos were generated in the last week" type="info" />
  );
}

export default VideosGrid;
