import { atom } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';

export const zoomState = atom({
  key: 'zoomState',
  default: 1,
});

export const hasUnsavedChangesState = atom({
  key: 'hasUnsavedChangesState',
  default: false,
});

export const activePanelState = atom({
  key: 'activePanelState',
  default: EditorPanel.Settings,
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
