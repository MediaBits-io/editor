import { useCallback, useEffect, useRef } from 'react';
import { AtomEffect, useRecoilCallback, useSetRecoilState } from 'recoil';
import {
  canRedoState,
  canUndoState,
  historyControlsState,
} from '../atoms/history';

const history: {
  present: number;
  stack: Array<{
    label: string;
    undo: () => void;
    apply: () => void;
  }>;
} = { present: -1, stack: [] };

export const historyEffect = <T,>(label: string): AtomEffect<T> => ({
  setSelf,
  onSet,
}) => {
  onSet((newValue, oldValue) => {
    history.stack.splice(
      history.present + 1,
      history.stack.length - history.present - 1
    );
    history.stack.push({
      label: `${label}: ${JSON.stringify(oldValue)} -> ${JSON.stringify(
        newValue
      )}`,
      undo: () => setSelf(oldValue),
      apply: () => setSelf(newValue),
    });

    history.present = history.stack.length - 1;
  });
};

function HistoryController() {
  const setHistoryControls = useSetRecoilState(historyControlsState);
  const historyRef = useRef(history);

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
        const { undo } = stack[present];
        undo();
        historyRef.current.present -= 1;
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
        apply();
        set(canUndoState, getCanUndo());
        set(canRedoState, getCanRedo());
      }
    },
    [getCanRedo, getCanUndo]
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
