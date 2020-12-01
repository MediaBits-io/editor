export const FreePlan = 'free';

export enum Plan {
  Basic = 'basic',
  Professional = 'professional',
}

export type PlanConfig = {
  durationLimit: number;
  videosPerMonth?: number;
  isFullHDAvailable: boolean;
  renderPriority: number; // higher is better
  price: number;
};
