import { Undoable } from './reducer/undoable';
import { EditorPanel } from '../../interfaces/Editor';
import { TemplateState } from './reducer/templateReducer';
import { AudioState } from '../../components/AudioModal/AudioModal';

export type EditorState = {
  template: Undoable<TemplateState>;
  lastSaved: TemplateState;
  selectedId?: string;
  activePanel: EditorPanel;
  audio?: AudioState;
  zoom: number;
  loading: boolean;
};
