import { DefaultValue, selector } from 'recoil';
import { Template } from '../../interfaces/StageConfig';
import {
  backgroundState,
  dimensionsState,
  subtitlesStyleState,
} from '../atoms/template';
import { elementsSelector } from './elements';
import { subtitlesSelector } from './subtitles';

export const templateSelector = selector<Template>({
  key: 'templateSelector',
  get: ({ get }) => {
    const subtitleEntries = get(subtitlesSelector);
    return {
      background: get(backgroundState),
      dimensions: get(dimensionsState),
      elements: get(elementsSelector),
      subtitles: subtitleEntries.length
        ? {
            entries: subtitleEntries,
            style: get(subtitlesStyleState),
          }
        : undefined,
    };
  },
  set: ({ set, reset }, template) => {
    if (template instanceof DefaultValue) {
      reset(dimensionsState);
      reset(backgroundState);
      reset(elementsSelector);
      reset(subtitlesSelector);
    } else {
      set(dimensionsState, template.dimensions);
      set(backgroundState, template.background);
      set(elementsSelector, template.elements);
      if (template.subtitles) {
        set(subtitlesSelector, template.subtitles.entries);
        set(subtitlesStyleState, template.subtitles.style);
      }
    }
  },
});
