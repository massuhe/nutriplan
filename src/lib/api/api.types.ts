import type { IPlan } from 'src/types';

export interface IAPI {
  getPlan: (planId?: string) => IPlan;
  getActivePlan: () => IPlan;
  getAllPlanNames: () => { id: string; name: string }[];
}
