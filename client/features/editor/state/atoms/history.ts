import { atom } from 'recoil';

export const historyControlsState = atom({
  key: 'historyState',
  default: {
    undo: () => {},
    redo: () => {},
  },
});

export const historyPresentState = atom({
  key: 'historyPresentState',
  default: -1,
});

export const canUndoState = atom({
  key: 'canUndoState',
  default: false,
});

export const canRedoState = atom({
  key: 'canRedoState',
  default: false,
});
