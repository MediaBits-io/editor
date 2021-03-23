import { useCallback, useEffect, useRef } from 'react';
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilTransactionObserver_UNSTABLE,
  RecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  canRedoState,
  canUndoState,
  historyControlsState,
  historyPresentState,
} from '../state/atoms/history';
import { backgroundState, dimensionsState } from '../state/atoms/template';
import { elementSelector } from '../state/selectors/elements';

type Setter = <T>(
  recoilVal: RecoilState<T>,
  valOrUpdater: T | ((currVal: T) => T)
) => void;

type HistoryItem = {
  undo: (set: Setter) => void;
  apply: (set: Setter) => void;
};

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

  const create = useRecoilCallback(
    ({ set }) => (fn: (set: Setter) => void) => () => fn(set),
    []
  );

  // TODO: remove all after present on add new history entry to stack

  const undo = useRecoilCallback(
    ({ set }) => () => {
      if (getCanUndo()) {
        const { present, stack } = historyRef.current;
        const { undo } = stack[present];
        undo(set);
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
        const { apply } = stack[present];
        apply(set);
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

  useRecoilTransactionObserver_UNSTABLE(
    async ({ snapshot, previousSnapshot }) => {
      const [
        previousHistoryPresent,
        currentHistoryPresent,
      ] = await Promise.all([
        previousSnapshot.getPromise(historyPresentState),
        snapshot.getPromise(historyPresentState),
      ]);

      const currentDimensions = await snapshot.getPromise(dimensionsState);
      const previousDimensions = await previousSnapshot.getPromise(
        dimensionsState
      );
      if (
        previousHistoryPresent === currentHistoryPresent &&
        currentDimensions !== previousDimensions
      ) {
        pushHistory(
          {
            apply: (set) => {
              set(dimensionsState, currentDimensions);
            },
            undo: (set) => {
              set(dimensionsState, previousDimensions);
            },
          }
          // recordHistory([dimensionsState, backgroundState, elementSelector])(
          //   previousSnapshot,
          //   snapshot
          // )
        );
      }

      // const [
      //   previousDimensions,
      //   currentDimensions,
      //   previousHistory,
      //   currentHistory,
      // ] = await Promise.all([
      //   previousSnapshot.getPromise(dimensionsState),
      //   snapshot.getPromise(dimensionsState),
      //   previousSnapshot.getPromise(historyState),
      //   snapshot.getPromise(historyState),
      // ]);
      // if (previousDimensions !== currentDimensions) {
      //   historyRef.current = {
      //     undo: (set) => {
      //       set(dimensionsState, previousDimensions);
      //     },
      //     redo: () => {},
      //   };
      //   console.log('CHANGED', previousDimensions, currentDimensions);
      // }
    }
  );

  useEffect(() => {
    setHistoryControls({
      undo,
      redo,
    });
  }, [redo, setHistoryControls, undo]);

  return null;
}

export default HistoryController;
