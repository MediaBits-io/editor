import { useCallback } from 'react';

export default function useEditorHistory() {
  // TODO: implement
  // const { dispatch, state } = EditorContainer.useContainer();

  // const hasPast = !!state.template.past.length;
  // const hasFuture = !!state.template.future.length;

  // const undo = useCallback(() => {
  //   if (hasPast) {
  //     dispatch({ type: 'undo' });
  //   }
  // }, [dispatch, hasPast]);

  // const redo = useCallback(() => {
  //   if (hasFuture) {
  //     dispatch({ type: 'redo' });
  //   }
  // }, [dispatch, hasFuture]);

  return {
    undo: useCallback(() => {}, []),
    redo: useCallback(() => {}, []),
    hasPast: false,
    hasFuture: false,
  };
}
