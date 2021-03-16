import { atom } from 'recoil';
import { Plans } from '../interfaces/plans';

export const plansState = atom<Plans>({
  key: 'plansState',
  default: {
    free: { durationLimit: 0, price: 0 },
    professional: { durationLimit: 0, price: 0 },
  },
});
