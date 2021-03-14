import { atom, selector } from 'recoil';
import { Plan, PlanConfig, UserInfo, UserPlan } from '../interfaces';
import { plansState } from './plans';

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

export const userPlanInfoSelector = selector<PlanConfig>({
  key: 'userPlanInfoSelector',
  get: ({ get }) => {
    const userPlans = get(userPlanState);
    const plans = get(plansState);
    return plans[userPlans.plan];
  },
});
