import { equals } from 'ramda';
import { DefaultValue, selector } from 'recoil';
import { SHAPE_PROPERTIES_PANEL, SHAPE_TOOL_PANEL } from '../../constants';
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

export const selectedElementIdSelector = selector<string | undefined>({
  key: 'selectedElementIdSelector',
  get: ({ get }) => get(selectedElementIdState),
  set: ({ set, get, reset }, selectedElementId) => {
    if (selectedElementId instanceof DefaultValue) {
      const selectedElement = get(selectedElementSelector);
      if (selectedElement) {
        set(
          activePanelState,
          SHAPE_TOOL_PANEL[selectedElement.type] || get(activePanelState)
        );
      }
      reset(selectedElementIdState);
      return;
    }

    const element = selectedElementId && get(elementState(selectedElementId));
    if (element) {
      set(selectedElementIdState, selectedElementId);
      set(
        activePanelState,
        SHAPE_PROPERTIES_PANEL[element.type] || get(activePanelState)
      );
    }
  },
});
