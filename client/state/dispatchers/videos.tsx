import { useRecoilCallback } from 'recoil';
import { Videos } from '../../interfaces/videos';
import { areVideosLoadedState } from '../atoms/videos';
import { videoSelector } from '../selectors/videos';

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

  return {
    setVideosLoaded,
  };
}

export default useVideosDispatcher;
