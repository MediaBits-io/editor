import { useRecoilCallback } from 'recoil';
import { Videos } from '../../interfaces/videos';
import { areVideosLoadedState, lastSeenVideoIdsState } from '../atoms/videos';
import { generatedVideoIdsSelector, videoSelector } from '../selectors/videos';

function useVideosDispatcher() {
  const setVideosLoaded = useRecoilCallback(
    ({ set }) => (videos: Videos) => {
      set(areVideosLoadedState, true);
      Object.entries(videos).forEach(([id, video]) =>
        set(videoSelector(id), video)
      );
      return videos;
    },
    []
  );

  const updateLastSeenVideos = useRecoilCallback(
    ({ set, snapshot }) => () => {
      const generatedVideoIds = snapshot
        .getLoadable(generatedVideoIdsSelector)
        .getValue();
      set(lastSeenVideoIdsState, generatedVideoIds);
    },
    []
  );

  return {
    setVideosLoaded,
    updateLastSeenVideos,
  };
}

export default useVideosDispatcher;
