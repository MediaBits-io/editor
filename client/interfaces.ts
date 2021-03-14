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

export interface UserPlanDTO {
  expiresAt?: string;
  createdAt: string;
  plan: string;
}

export interface AuthInfoDTO {
  user: {
    uid: string;
    email?: string;
  };
  plan: UserPlanDTO | null;
}

export interface AuthInfo {
  user: UserInfo | null;
  plan: UserPlan;
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

export function deserializeUserPlanDTO(dto: UserPlanDTO): UserPlan {
  return {
    plan: dto.plan as Plan,
    createdAt: new Date(dto.createdAt),
    expiresAt: dto.expiresAt ? new Date(dto.createdAt) : undefined,
  };
}
