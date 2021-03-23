import { equals } from 'ramda';
import { useEffect } from 'react';
import {
  useRecoilCallback,
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from 'recoil';
import {
  historyControlsState,
  historyPresentState,
  historyState,
} from '../state/atoms/history';
import { HistoryItem, tracked, untracked } from '../state/effects/history';
import { canRedoSelector, canUndoSelector } from '../state/selectors/history';

function HistoryController() {
  const setHistoryControls = useSetRecoilState(historyControlsState);

  const undo = useRecoilCallback(
    ({ snapshot, set }) => () => {
      const canUndo = snapshot.getLoadable(canUndoSelector).getValue();
      if (canUndo) {
        const history = snapshot.getLoadable(historyState).getValue();
        const historyPresent = snapshot
          .getLoadable(historyPresentState)
          .getValue();
        history[historyPresent].forEach(({ state, previous }) =>
          set(state, previous)
        );
        set(historyPresentState, historyPresent - 1);
      }
    },
    []
  );

  const redo = useRecoilCallback(
    ({ snapshot, set }) => () => {
      const canRedo = snapshot.getLoadable(canRedoSelector).getValue();
      if (canRedo) {
        const history = snapshot.getLoadable(historyState).getValue();
        const historyPresent = snapshot
          .getLoadable(historyPresentState)
          .getValue();
        history[historyPresent + 1].forEach(({ state, current }) =>
          set(state, current)
        );
        set(historyPresentState, historyPresent + 1);
      }
    },
    []
  );

  const pushHistory = useRecoilCallback(
    ({ snapshot, set }) => (historyItem: HistoryItem) => {
      const history = snapshot.getLoadable(historyState).getValue();
      const historyPresent = snapshot
        .getLoadable(historyPresentState)
        .getValue();
      const newHistory = [...history.slice(0, historyPresent + 1), historyItem];
      set(historyPresentState, newHistory.length - 1);
      set(historyState, newHistory);
    },
    []
  );

  useRecoilTransactionObserver_UNSTABLE(({ snapshot, previousSnapshot }) => {
    const currentHistoryPresent = snapshot
      .getLoadable(historyPresentState)
      .getValue();
    const previousHistoryPresent = previousSnapshot
      .getLoadable(historyPresentState)
      .getValue();

    if (previousHistoryPresent !== currentHistoryPresent) {
      return;
    }

    const changes = tracked
      .map((state) => ({
        state,
        current: snapshot.getLoadable(state).getValue(),
        previous: previousSnapshot.getLoadable(state).getValue(),
      }))
      .filter(({ current, previous }) => !equals(current, previous));

    if (changes.length) {
      untracked.forEach((state) => {
        changes.push({
          state,
          current: snapshot.getLoadable(state).getValue(),
          previous: previousSnapshot.getLoadable(state).getValue(),
        });
      });
      pushHistory(changes);
    }
  });

  useEffect(() => {
    setHistoryControls({
      undo,
      redo,
    });
  }, [redo, setHistoryControls, undo]);

  return null;
}

export default HistoryController;
