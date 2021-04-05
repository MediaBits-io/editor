import Konva from 'konva';
import { atom, atomFamily } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import { Template } from '../../interfaces/StageConfig';
import { untrackedHistoryEffect } from '../effects/history';

export const zoomState = atom({
  key: 'zoomState',
  default: 1,
});

export const activePanelState = atom({
  key: 'activePanelState',
  default: EditorPanel.Settings,
  effects_UNSTABLE: [untrackedHistoryEffect],
});

export const isLoadingState = atom({
  key: 'isLoadingState',
  default: false,
});

export const lastSavedTemplateState = atom<Template | undefined>({
  key: 'lastSavedTemplateState',
  default: undefined,
});

export const selectedElementIdState = atom<string | undefined>({
  key: 'selectedElementIdState',
  default: undefined,
  effects_UNSTABLE: [untrackedHistoryEffect],
});

export const guideLinesState = atom<Konva.LineConfig[]>({
  key: 'guideLinesState',
  default: [],
  effects_UNSTABLE: [untrackedHistoryEffect], // TODO: needed?
});

export const elementRefState = atomFamily<Konva.Shape | undefined, string>({
  key: 'elementRefsState',
  default: undefined,
});
