import { sortBy, without, prop } from 'ramda';
import { DefaultValue, selector, selectorFamily } from 'recoil';
import { Subtitle } from '../../interfaces/Subtitles';
import { subtitleIdsState, subtitleState } from '../atoms/template';

export const subtitlesSelector = selector<Subtitle[]>({
  key: 'subtitlesSelector',
  get: ({ get }) =>
    sortBy(
      prop('start'),
      get(subtitleIdsState).map((id) => get(subtitleState(id))!)
    ),
  set: ({ reset, get, set }, subtitles) => {
    if (subtitles instanceof DefaultValue) {
      get(subtitleIdsState).map((id) => reset(subtitleState(id)));
      reset(subtitleIdsState);
    } else {
      set(
        subtitleIdsState,
        subtitles.map((subtitle) => {
          set(subtitleState(subtitle.id), subtitle);
          return subtitle.id;
        })
      );
    }
  },
});

export const subtitlesByEndSelector = selector<Subtitle[]>({
  key: 'subtitlesByEndSelector',
  get: ({ get }) => sortBy(prop('end'), get(subtitlesSelector)),
});

export const subtitlesByStartSelector = selector<Subtitle[]>({
  key: 'subtitlesByStartSelector',
  get: ({ get }) => sortBy(prop('start'), get(subtitlesSelector)),
});

export const subtitleSelector = selectorFamily<Subtitle | undefined, string>({
  key: 'subtitleSelector',
  get: (id) => ({ get }) => get(subtitleState(id)),
  set: (id) => ({ set, get, reset }, subtitle) => {
    if (subtitle instanceof DefaultValue) {
      reset(subtitleState(id));
      set(subtitleIdsState, (subtitleIds) => without([id], subtitleIds));
    } else {
      set(subtitleState(id), subtitle);
      const subtitleIds = get(subtitleIdsState);
      if (!subtitleIds.includes(id)) {
        set(subtitleIdsState, [...subtitleIds, id]);
      }
    }
  },
});
