import { DefaultValue, selector } from 'recoil';
import { Template } from '../../interfaces/StageConfig';
import { backgroundState, dimensionsState } from '../atoms/template';
import { elementsSelector } from './elements';

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
