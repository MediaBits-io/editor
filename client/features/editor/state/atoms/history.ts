import { atom } from 'recoil';
import { HistoryItem } from '../effects/history';

export const historyControlsState = atom({
  key: 'historyControlsState',
  default: {
    undo: () => {},
    redo: () => {},
  },
});

export const historyState = atom<HistoryItem[]>({
  key: 'historyState',
  default: [],
});

export const historyPresentState = atom({
  key: 'historyPresentState',
  default: -1,
});
