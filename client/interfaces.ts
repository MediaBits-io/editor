export const FreePlan = 'free';

export enum Plan {
  Free = 'free',
  Professional = 'professional',
}

export type PlanConfig = {
  durationLimit: number;
  price: number;
};

export type Plans = {
  [plan in Plan]: PlanConfig;
};

export interface AuthInfo {
  user: UserInfo;
  plan: UserPlan | null;
}

export interface UserPlan {
  expiresAt?: Date;
  createdAt: Date;
  plan: Plan;
}

export interface UserInfo {
  uid: string;
  email?: string;
}
