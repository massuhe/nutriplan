import type { IPlan } from 'src/types';

export interface IAPI {
  getPlan: (planId?: string) => Promise<IPlan>;
  getActivePlan: () => Promise<IPlan>;
  getAllPlanNames: () => Promise<{ id: string; name: string }[]>;
}
