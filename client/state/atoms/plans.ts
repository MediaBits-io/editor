import { atom } from 'recoil';
import { Plans } from '../../interfaces/plans';

export const plansState = atom<Plans>({
  key: 'plansState',
  default: {} as Plans,
});
