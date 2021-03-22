import { equals } from 'ramda';
import { selector, selectorFamily } from 'recoil';
import { EditorPanel } from '../../interfaces/Editor';
import {
  activePanelState,
  lastSavedTemplateState,
  selectedElementIdState,
} from '../atoms/editor';
import { elementState } from '../atoms/template';
import { templateSelector } from './template';

export const hasUnsavedChangesSelector = selector({
  key: 'hasUnsavedChangesSelector',
  get: ({ get }) => !equals(get(lastSavedTemplateState), get(templateSelector)),
});

export const selectedElementSelector = selector({
  key: 'selectedElementSelector',
  get: ({ get }) => {
    const selectedId = get(selectedElementIdState);
    return selectedId ? get(elementState(selectedId)) : undefined;
  },
});

export const isEitherPanelActiveSelector = selectorFamily({
  key: 'isEitherPanelActiveSelector',
  get: (panels: EditorPanel[]) => ({ get }) =>
    panels.includes(get(activePanelState)),
});
