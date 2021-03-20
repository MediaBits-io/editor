import { DefaultValue, selector } from 'recoil';
import { CanvasElement, Template } from '../../interfaces/StageConfig';
import {
  elementState,
  elementIdsState,
  backgroundState,
  dimensionsState,
} from '../atoms/template';

export const elementsSelector = selector<CanvasElement[]>({
  key: 'elementsSelector',
  get: ({ get }) => get(elementIdsState).map((id) => get(elementState(id))!),
  set: ({ reset, get, set }, elements) => {
    if (elements instanceof DefaultValue) {
      get(elementIdsState).map((id) => reset(elementState(id)));
      reset(elementIdsState);
    } else {
      set(
        elementIdsState,
        elements.map((element) => {
          set(elementState(element.id), element);
          return element.id;
        })
      );
    }
  },
});

export const templateSelector = selector<Template>({
  key: 'templateSelector',
  get: ({ get }) => ({
    background: get(backgroundState),
    dimensions: get(dimensionsState),
    elements: get(elementsSelector),
  }),
  set: ({ set, reset }, template) => {
    if (template instanceof DefaultValue) {
      reset(dimensionsState);
      reset(backgroundState);
      reset(elementsSelector);
    } else {
      set(dimensionsState, template.dimensions);
      set(backgroundState, template.background);
      set(elementsSelector, template.elements);
    }
  },
});
