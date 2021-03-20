import mergeReducers from '../../../../../utils/reducer';
import { EditorState } from '../../../interfaces/Editor';
import editorReducer, { EditorAction } from './editorReducer';
import templateReducer, { TemplateAction } from './templateReducer';
import undoable, { Action as UndoableAction } from './undoable';

export type Action = UndoableAction | TemplateAction | EditorAction;

const reducer = (prevState: EditorState, action: Action): EditorState => {
  const state = mergeReducers<EditorState, Action>(editorReducer)(
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
