import React, { ReactElement } from 'react';

const MAX_PLAN_DAYS_DISPLAY = 5;

const PlanSkeletons = (): ReactElement => (
  <>
    {Array.from({ length: MAX_PLAN_DAYS_DISPLAY }).map((_, i) => (
      <div
        className="flex-1 bg-gradient-to-t from-green-500 to-green-300 w-1/5 rounded-lg shadow-2xl mx-2"
        key={i}
      ></div>
    ))}
  </>
);

export default PlanSkeletons;
