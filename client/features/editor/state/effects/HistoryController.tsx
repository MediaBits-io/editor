import { equals } from 'ramda';
import { useCallback, useEffect, useRef } from 'react';
import {
  AtomEffect,
  RecoilState,
  useRecoilCallback,
  useRecoilTransactionObserver_UNSTABLE,
  useSetRecoilState,
} from 'recoil';
import {
  canRedoState,
  canUndoState,
  historyControlsState,
  historyPresentState,
} from '../atoms/history';

const tracked: Array<RecoilState<any>> = [];
const untracked: Array<RecoilState<any>> = [];

export const untrackedHistoryEffect: AtomEffect<any> = ({ node }) => {
  untracked.push(node);
};

export const historyEffect: AtomEffect<any> = ({ node }) => {
  tracked.push(node);
};

type HistoryItem = Array<{
  state: RecoilState<any>;
  current: any;
  previous: any;
}>;

function HistoryController() {
  const setHistoryControls = useSetRecoilState(historyControlsState);
  const historyRef = useRef<{
    present: number;
    stack: HistoryItem[];
  }>({
    present: -1,
    stack: [],
  });

  // TODO: move to selectors and use present from state
  const getCanUndo = useCallback(() => historyRef.current.present > -1, []);
  const getCanRedo = useCallback(
    () => historyRef.current.present < historyRef.current.stack.length - 1,
    []
  );

  const undo = useRecoilCallback(
    ({ set }) => () => {
      if (getCanUndo()) {
        const { present, stack } = historyRef.current;
        stack[present].forEach(({ state, previous }) => set(state, previous));
        historyRef.current.present -= 1;
        set(historyPresentState, historyRef.current.present);
        set(canUndoState, getCanUndo());
        set(canRedoState, getCanRedo());
      }
    },
    [getCanRedo, getCanUndo]
  );

  const redo = useRecoilCallback(
    ({ set }) => () => {
      if (getCanRedo()) {
        historyRef.current.present += 1;
        const { present, stack } = historyRef.current;
        stack[present].forEach(({ state, current }) => set(state, current));
        set(historyPresentState, historyRef.current.present);
        set(canUndoState, getCanUndo());
        set(canRedoState, getCanRedo());
      }
    },
    [getCanRedo, getCanUndo]
  );

  const pushHistory = useRecoilCallback(
    ({ set }) => (historyItem: HistoryItem) => {
      const { present, stack } = historyRef.current;
      stack.splice(present + 1, stack.length - present - 1);
      stack.push(historyItem);
      historyRef.current.present = stack.length - 1;
      set(historyPresentState, historyRef.current.present);
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

    const changes = tracked
      .map((state) => ({
        state,
        current: snapshot.getLoadable(state).getValue(),
        previous: previousSnapshot.getLoadable(state).getValue(),
      }))
      .filter(({ current, previous }) => !equals(current, previous));

    if (previousHistoryPresent === currentHistoryPresent && changes.length) {
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
