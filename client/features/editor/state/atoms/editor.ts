import { atom } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import { Template } from '../../interfaces/StageConfig';
import { templateSelector } from '../selectors/template';

export const zoomState = atom({
  key: 'zoomState',
  default: 1,
});

export const activePanelState = atom({
  key: 'activePanelState',
  default: EditorPanel.Settings,
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export const lastSavedTemplateState = atom<Template | undefined>({
  key: 'lastSavedTemplate',
  default: templateSelector,
});
