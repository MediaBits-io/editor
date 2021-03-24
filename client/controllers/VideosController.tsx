import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { pollingVideoIdsSelector } from '../state/selectors/videos';
import useVideos from '../hooks/useVideos';

function VideosController() {
  const pollingIds = useRecoilValue(pollingVideoIdsSelector);
  const { fetchInitialVideos, fetchPollingVideos } = useVideos();
  const intervalRef = useRef<any>();

  const startPolling = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchPollingVideos, 3000);
    }
  }, [fetchPollingVideos]);

  const stopPolling = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  }, []);

  useEffect(() => {
    if (pollingIds.length) {
      startPolling();
    } else {
      stopPolling();
    }
  }, [pollingIds, startPolling, stopPolling]);

  useEffect(() => {
    fetchInitialVideos();
    return stopPolling;
  }, [fetchInitialVideos, stopPolling]);

  return null;
}

export default VideosController;
