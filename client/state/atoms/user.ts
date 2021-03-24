import { atom } from 'recoil';
import { Plan } from '../../interfaces/plans';
import { UserInfo, UserPlan } from '../../interfaces/user';

export const userInfoState = atom<UserInfo | null>({
  key: 'userInfoState',
  default: null,
});

export const userPlanState = atom<UserPlan>({
  key: 'userPlanState',
  default: {
    plan: Plan.Free,
    createdAt: new Date(),
  },
});
