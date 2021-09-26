/* eslint-disable @typescript-eslint/ban-types */
import plansMock from '../../data/plans.json';
import type { IAPI } from './api.types';

const mockDB = {
  plans: plansMock,
};

const getActivePlan = () => mockDB.plans[0];

const getAllPlanNames = (): { id: string; name: string }[] =>
  mockDB.plans.map(({ name, id }) => ({ name, id }));

const getPlan = (planId?: string) => {
  if (!planId) return getActivePlan();
  return mockDB.plans.find((plan) => plan.id === planId);
};

type MatchFunction = (...args: any[]) => any;
type Promisify<U extends { [index: string]: MatchFunction }> = {
  [Key in keyof U]: (...args: Parameters<U[Key]>) => ReturnType<U[Key]>;
};

const createMockApi = <CallsObject extends { [index: string]: MatchFunction }>(
  calls: CallsObject,
  delay: number
): Promisify<CallsObject> => {
  return Object.entries(calls).reduce(
    (obj, [key, call]) => ({
      ...obj,
      [key]: (...args: unknown[]) =>
        new Promise((resolve) =>
          setTimeout(() => resolve(call(...args)), delay)
        ),
    }),
    {}
  ) as Promisify<CallsObject>;
};

// TODO: Return once I become a TS wizard
const api: IAPI = createMockApi(
  {
    getActivePlan,
    getAllPlanNames,
    getPlan,
  },
  2000
);

export default api;
