import type { IPlan } from "src/types";

export interface IAPI {
  getActivePlan: () => IPlan
}