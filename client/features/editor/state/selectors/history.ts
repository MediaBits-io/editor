import { selector } from 'recoil';
import { historyPresentState, historyState } from '../atoms/history';

export const canUndoSelector = selector({
  key: 'canUndoSelector',
  get: ({ get }) => get(historyPresentState) > -1,
});

export const canRedoSelector = selector({
  key: 'canRedoSelector',
  get: ({ get }) => get(historyPresentState) < get(historyState).length - 1,
});
