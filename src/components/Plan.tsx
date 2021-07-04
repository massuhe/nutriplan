import React, { ReactElement, useState } from 'react';
import Carousel from './Carousel.jsx';
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

  const [index, setIndex] = useState<number>(() =>
    plan.findIndex(findTodaysPlanIndex)
  );

  const handleIndexChange = (newIndex: number) => setIndex(newIndex);

  return (
    <div className="h-full">
      <Carousel<IPlanDay>
        allItems={plan}
        keyProp="date"
        index={index}
        onIndexChange={handleIndexChange}
      >
        {(planDay) => <PlanDay planDay={planDay} />}
      </Carousel>
    </div>
  );
};

export default Plan;
