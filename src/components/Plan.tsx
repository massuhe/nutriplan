import React, { ReactElement } from 'react';
import PlanCarousel from './PlanCarousel.js';
import PlanDay from './PlanDay.js';
import PlanSkeletons from './PlanSkeletons.js';

import type { IPlanDay } from 'src/types.js';

const findTodaysPlanIndex = (planDay: IPlanDay) => {
  const planDate = new Date(planDay.date);
  const today = new Date('2021-03-14 12:00');
  return (
    planDate.getDay() === today.getDay() &&
    planDate.getFullYear() === today.getFullYear() &&
    planDate.getMonth() === today.getMonth()
  );
};

interface IPlanProps {
  plan: Array<IPlanDay>;
  loading: boolean;
}

const Plan = ({ plan, loading }: IPlanProps): ReactElement => {
  if (loading) return <PlanSkeletons />;

  return (
    <div className="h-full">
      <PlanCarousel
        allItems={plan}
        keyProp="date"
        initialIndex={plan.findIndex(findTodaysPlanIndex)}
      >
        {(planDay) => <PlanDay planDay={planDay} />}
      </PlanCarousel>
    </div>
  );
};

export default Plan;
