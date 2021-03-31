import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import useVideos from '../hooks/useVideos';
import { lastSeenVideoIdsState } from '../state/atoms/videos';
import useVideosDispatcher from '../state/dispatchers/videos';
import { pollingVideoIdsSelector } from '../state/selectors/videos';

function VideosController() {
  const pollingIds = useRecoilValue(pollingVideoIdsSelector);
  const lastSeenVideoIds = useRecoilValue(lastSeenVideoIdsState);
  const { fetchInitialVideos, fetchPollingVideos } = useVideos();
  const { updateLastSeenVideos } = useVideosDispatcher();
  const intervalRef = useRef<any>();

  const startPolling = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(fetchPollingVideos, 2000);
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

  useEffect(() => {
    if (lastSeenVideoIds === undefined) {
      updateLastSeenVideos();
    }
  }, [lastSeenVideoIds, updateLastSeenVideos]);
  return null;
}

export default VideosController;
