import { atom } from 'recoil';

export const progressModalState = atom<{ visible: boolean; taskId?: string }>({
  key: 'progressModalState',
  default: { visible: false, taskId: undefined },
});
