import { useRecoilCallback } from 'recoil';
import { historyControlsState } from '../atoms/history';

function useHistoryDispatcher() {
  const undo = useRecoilCallback(
    ({ snapshot, set }) => async () => {
      const history = await snapshot.getPromise(historyControlsState);
      history.undo();
    },
    []
  );

  const redo = useRecoilCallback(
    ({ snapshot }) => async () => {
      const history = await snapshot.getPromise(historyControlsState);
      history.redo();
    },
    []
  );

  return {
    undo,
    redo,
  };
}

export default useHistoryDispatcher;
