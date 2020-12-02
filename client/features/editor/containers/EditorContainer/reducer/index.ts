import mergeReducers from '../../../../../utils/reducer';
import { EditorState } from '../interfaces';
import editorReducer, { EditorAction } from './editorReducer';
import templateReducer, { TemplateAction } from './templateReducer';
import undoable, { Action as UndoableAction } from './undoable';
import zoomReducer, { ZoomAction } from './zoomReducer';

export type Action =
  | UndoableAction
  | TemplateAction
  | ZoomAction
  | EditorAction;

const reducer = (prevState: EditorState, action: Action): EditorState => {
  const template = undoable(templateReducer)(
    prevState.template,
    action as TemplateAction
  );

  const state =
    template !== prevState.template
      ? {
          ...prevState,
          template,
        }
      : prevState;

  return mergeReducers<EditorState, Action>(zoomReducer, editorReducer)(
    state,
    action
  );
};

export default reducer;
