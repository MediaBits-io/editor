import { Undoable } from './reducer/undoable';
import { EditorPanel } from '../../interfaces/Editor';
import { TemplateState } from './reducer/templateReducer';

export type EditorState = {
  template: Undoable<TemplateState>;
  lastSaved: TemplateState;
  selectedId?: string;
  activePanel: EditorPanel;
  zoom: number;
};
