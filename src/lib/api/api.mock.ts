/* eslint-disable @typescript-eslint/ban-types */
import plansMock from '../../data/plans.json';
import type { IAPI } from './api.types';

type ICallOption = { call: Function; delay: number };

const mockDB = {
  plans: plansMock,
};

const getActivePlan = () => mockDB.plans[0];
const getAllPlanNames = () =>
  mockDB.plans.map(({ name, id }) => ({ name, id }));
const getPlan = (planId?: string) => {
  if (!planId) return getActivePlan();
  return mockDB.plans.find((plan) => plan.id === planId);
};

// TODO: Return once I become a TS wizard
const createMockApi = (
  calls: { [index: string]: ICallOption | Function },
  delay: number
): unknown => {
  const mock: { [index: string]: Function } = {};

  for (const [key, callOpts] of Object.entries(calls)) {
    const [call, callDelay] =
      typeof callOpts === 'function'
        ? [callOpts, delay]
        : [callOpts.call, callOpts.delay];
    mock[key] = (...args: unknown[]) =>
      new Promise((resolve) =>
        setTimeout(() => resolve(call(...args)), callDelay)
      );
  }

  return mock;
};

const api = createMockApi(
  {
    getActivePlan,
    getAllPlanNames,
    getPlan,
  },
  2000
);

export default api as IAPI;
