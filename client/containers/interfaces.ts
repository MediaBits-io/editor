export const FreePlan = 'free';

export enum Plan {
  Free = 'free',
  Professional = 'professional',
}

export type PlanConfig = {
  durationLimit: number;
  price: number;
};
