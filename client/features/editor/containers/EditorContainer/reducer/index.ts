import mergeReducers from '../../../../../utils/reducer';
import editorReducer, { EditorAction } from './editorReducer';
import { Action as UndoableAction } from './undoable';

export type Action = UndoableAction | EditorAction;

const reducer = (prevState: any, action: Action) => {
  const state = mergeReducers<any, Action>(editorReducer)(prevState, action);

  return state;
};

export default reducer;
