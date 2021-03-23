import { useRecoilCallback } from 'recoil';
import { historyControlsState } from '../atoms/history';

function useHistoryDispatcher() {
  const undo = useRecoilCallback(
    ({ snapshot }) => () => {
      snapshot.getLoadable(historyControlsState).getValue().undo();
    },
    []
  );

  const redo = useRecoilCallback(
    ({ snapshot }) => () => {
      snapshot.getLoadable(historyControlsState).getValue().redo();
    },
    []
  );

  return {
    undo,
    redo,
  };
}

export default useHistoryDispatcher;
