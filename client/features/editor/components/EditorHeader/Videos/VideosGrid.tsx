import React from 'react';
import { useRecoilValue } from 'recoil';
import Alert from '../../../../../components/ui/Alert';
import { sortedVideoIdsSelector } from '../../../../../state/selectors/videos';
import classNames from '../../../../../utils/classNames';
import Video from './Video';

function VideosGrid() {
  const sortedVideoIds = useRecoilValue(sortedVideoIdsSelector);

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
        <Video key={id} id={id} />
      ))}
    </div>
  ) : (
    <Alert title="No videos were generated in the last 24 hours" type="info" />
  );
}

export default VideosGrid;
