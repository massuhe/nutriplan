// TODO
import type { IPlan } from 'src/types';
import type { IAPI } from './api.types';

const getPlan = async (): Promise<IPlan> => {
  return {} as IPlan;
};

const getActivePlan = async (): Promise<IPlan> => {
  return {} as IPlan;
};

const getAllPlanNames = async (): Promise<{ id: string; name: string }[]> => {
  return [];
};

const api: IAPI = {
  getPlan,
  getActivePlan,
  getAllPlanNames,
};

export default api;
