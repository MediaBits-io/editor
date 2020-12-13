import React, { useMemo } from 'react';
import Alert from '../../../../../components/ui/Alert';
import { Videos } from '../../../../../containers/VideosContainer';
import classNames from '../../../../../utils/classNames';
import Video from './Video';

const sortMostRecentTemplateFirst = (videos: Videos) => {
  return Object.entries(videos)
    .filter(([, { url }]) => url)
    .sort(([, a], [, b]) => b.createdAt.getTime() - a.createdAt.getTime());
};

interface Props {
  videos: Videos;
}

function VideosGrid({ videos }: Props) {
  const sortedVideos = useMemo(() => sortMostRecentTemplateFirst(videos), [
    videos,
  ]);

  return sortedVideos.length ? (
    <div
      className={classNames(
        'p-2 grid gap-2 grid-flow-row-dense overflow-y-auto',
        sortedVideos.length === 1
          ? 'grid-cols-1 max-h-72'
          : 'grid-cols-2 max-h-52'
      )}
    >
      {sortedVideos.map(([id, { url }]) => (
        <Video key={id} url={url!} />
      ))}
    </div>
  ) : (
    <Alert title="No videos were generated in the last 24 hours" type="info" />
  );
}

export default VideosGrid;
