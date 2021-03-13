import React, { useEffect, useState } from 'react';
import PlanDay from './PlanDay.js';

const MAX_PLAN_DAYS_DISPLAY = 5;
const HALF_PLANS = Math.floor(MAX_PLAN_DAYS_DISPLAY / 2);

const PlanSkeletons = () => (
  <>
    {Array.from({ length: MAX_PLAN_DAYS_DISPLAY }).map((_, i) => (
      <div
        className="flex-1 bg-gradient-to-t from-green-500 to-green-300 w-1/5 rounded-lg shadow-2xl mx-2"
        key={i}
      ></div>
    ))}
  </>
);

const findTodaysPlanIndex = (planDay) => {
  const planDate = new Date(planDay.date);
  const today = new Date('2021-03-13 12:00');
  return (
    planDate.getDay() === today.getDay() &&
    planDate.getFullYear() === today.getFullYear() &&
    planDate.getMonth() === today.getMonth()
  );
};

const getWeekPlanDays = (plan, activePlanIndex) => {
  const leftLimit =
    activePlanIndex - HALF_PLANS >= 0 ? activePlanIndex - HALF_PLANS : 0;
  const leftPlans = plan.slice(leftLimit, plan[activePlanIndex]);
  const offset = HALF_PLANS - leftPlans.length;
  if (plan[activePlanIndex - HALF_PLANS - 1]) {
    leftPlans.push(plan[activePlanIndex - HALF_PLANS - 1]);
  }

  const rightPlans = plan.slice(
    activePlanIndex + 1
    // activePlanIndex + 1 + HALF_PLANS + 1
  );

  return {
    offset: 0,
    planDays: [].concat(leftPlans, plan[activePlanIndex], rightPlans),
  };
};

const Plan = ({ plan, loading }) => {
  if (loading) return <PlanSkeletons />;

  const [activePlanIndex, setActivePlanIndex] = useState(() =>
    plan.findIndex(findTodaysPlanIndex)
  );
  const { offset, planDays } = getWeekPlanDays(plan, activePlanIndex);

  return (
    <div className="h-full">
      <section
        className="flex flex-1 overflow-hidden h-full"
        style={{ '--offset': offset }}
      >
        {planDays.map((planDay) => (
          <PlanDay key={String(planDay.date)} planDay={planDay} />
        ))}
      </section>
    </div>
  );
};

export default Plan;
