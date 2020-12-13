import mergeReducers from '../../../../../utils/reducer';
import { EditorState } from '../../../interfaces';
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
  const state = mergeReducers<EditorState, Action>(zoomReducer, editorReducer)(
    prevState,
    action
  );

  const template = undoable(templateReducer)(
    state.template,
    action as TemplateAction
  );

  return template !== state.template
    ? {
        ...state,
        template,
      }
    : state;
};

export default reducer;
