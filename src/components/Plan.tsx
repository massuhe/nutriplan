import React, { ReactElement, useState } from 'react';
import Carousel from './Carousel.jsx';
import PlanDay from './PlanDay.js';
import PlanSkeletons from './PlanSkeletons.js';

import type { IPlan, IPlanDay, IRecipe } from 'src/types.js';

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
  plan: IPlan|undefined;
  loading: boolean;
  onPhotoClick: (activePhoto: string) => void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const Plan = ({ plan, loading, onPhotoClick, onRecipeClick }: IPlanProps): ReactElement => {
  // TODO: Add enter and exit animation between skeletons and actual elements.
  if (loading) return <PlanSkeletons />;

  const [index, setIndex] = useState<number>(() =>
    plan?.days?.findIndex(findTodaysPlanIndex) || 0
  );

  const handleIndexChange = (newIndex: number) => setIndex(newIndex);

  return (
    <div className="h-full flex flex-col flex-1">
      <Carousel<IPlanDay>
        allItems={plan?.days}
        keyProp="date"
        index={index}
        onIndexChange={handleIndexChange}
      >
        {(planDay) => <PlanDay planDay={planDay} recipes={plan?.recipes} onPhotoClick={onPhotoClick} onRecipeClick={onRecipeClick} />}
      </Carousel>
    </div>
  );
};

export default Plan;
