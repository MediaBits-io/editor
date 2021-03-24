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
