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

export interface AuthInfoDTO {
  user: {
    uid: string;
    email?: string;
  };
  plan: {
    expiresAt?: string;
    createdAt: string;
    plan: string;
  } | null;
}

export interface AuthInfo {
  user?: UserInfo;
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

export function deserializeAuthInfoDTO(dto: AuthInfoDTO | null): AuthInfo {
  return {
    user: dto ? dto.user : undefined,
    plan: dto?.plan
      ? {
          plan: dto.plan.plan as Plan,
          createdAt: new Date(dto.plan.createdAt),
          expiresAt: dto.plan.expiresAt
            ? new Date(dto.plan.createdAt)
            : undefined,
        }
      : {
          plan: Plan.Free,
          createdAt: new Date(),
        },
  };
}
