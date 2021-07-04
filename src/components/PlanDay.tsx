import React, { ReactElement } from 'react';
import PlanMeal from './PlanMeal';
import type { IPlanDay } from '../types';

interface IPlanDayProps {
  planDay: IPlanDay;
}

const toDisplayDate = (date: string) => {
  return new Date(date).toDateString();
};

const PlanDay = ({ planDay }: IPlanDayProps): ReactElement => (
  <article className="bg-green-50 py-3 px-5 rounded-lg shadow-2xl h-full">
    <h3 className="text-center font-serif text-lg text-green-500 mb-5">
      {toDisplayDate(planDay.date)}
    </h3>
    <div className="flex flex-col flex-1">
      {planDay.meals.map((meal, i) => (
        <PlanMeal meal={meal} key={i} />
      ))}
    </div>
  </article>
);

export default PlanDay;
