import { atom } from 'recoil';

export const appReadyState = atom({
  key: 'appReadyState',
  default: { rendered: false },
});
