import 'firebase/analytics';
import 'firebase/auth';
import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { Plan } from '../interfaces';

export interface UserPlan {
  expiresAt: Date;
  createdAt: Date;
  plan: Plan;
}

function useUser() {
  // TODO: get from backend
  const [plans] = useState({
    [Plan.Free]: {
      price: 0,
      durationLimit: 60,
    },
    [Plan.Professional]: {
      price: 900,
      durationLimit: 60 * 60,
    },
  });
  const [userPlan] = useState<UserPlan>({
    plan: Plan.Free,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000),
  });

  const userPlanInfo = plans[userPlan.plan];

  return {
    userPlan,
    userPlanInfo,
  };
}

export const UserContainer = createContainer(useUser);
