import { equals } from 'ramda';
import { selector, selectorFamily } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import {
  activePanelState,
  lastSavedTemplateState,
  selectedElementIdState,
} from '../atoms/editor';
import { elementState, subtitleState } from '../atoms/template';
import { templateSelector } from './template';

export const hasUnsavedChangesSelector = selector({
  key: 'hasUnsavedChangesSelector',
  get: ({ get }) => !equals(get(lastSavedTemplateState), get(templateSelector)),
});

export const selectedElementOrSubtitleSelector = selector({
  key: 'selectedElementOrSubtitleSelector',
  get: ({ get }) => {
    const selectedElementId = get(selectedElementIdState);
    return selectedElementId
      ? get(elementState(selectedElementId)) ??
          get(subtitleState(selectedElementId))
      : undefined;
  },
});

export const isEitherPanelActiveSelector = selectorFamily({
  key: 'isEitherPanelActiveSelector',
  get: (panels: EditorPanel[]) => ({ get }) =>
    panels.includes(get(activePanelState)),
});
