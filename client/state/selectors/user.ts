import { selector } from 'recoil';
import { PlanConfig } from '../../interfaces/plans';
import { plansState } from '../atoms/plans';
import { userPlanState } from '../atoms/user';

export const userPlanInfoSelector = selector<PlanConfig>({
  key: 'userPlanInfoSelector',
  get: ({ get }) => {
    const userPlan = get(userPlanState);
    const plans = get(plansState);
    return plans[userPlan.plan];
  },
});
