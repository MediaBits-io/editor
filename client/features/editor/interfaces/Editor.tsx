import { Undoable } from '../containers/EditorContainer/reducer/undoable';
import { TemplateState } from '../containers/EditorContainer/reducer/templateReducer';
import { AudioState } from '../components/AudioModal/AudioModal';

export enum EditorPanel {
  Settings = 'settings-panel',
  Text = 'text-panel',
  Elements = 'elements-panel',
  Audio = 'audio-panel',
  Image = 'image-panel',
  ImageProperties = 'image-properties-panel',
  TextProperties = 'text-properties-panel',
  ProgressBarProperties = 'progress-bar-properties-panel',
  WaveformProperties = 'waveform-properties-panel',
  RectangleProperties = 'rectangle-properties-panel',
}
export type EditorState = {
  template: Undoable<TemplateState>;
  lastSaved: TemplateState;
  selectedId?: string;
  activePanel: EditorPanel;
  audio?: AudioState;
  zoom: number;
  loading: boolean;
};
