import React, { ReactElement } from 'react';
import PlanMeal from './PlanMeal';
import type { IPlanDay, IRecipe } from '../types';

interface IPlanDayProps {
  planDay: IPlanDay;
  recipes: IRecipe[]|void;
  onPhotoClick: (activePhoto: string) => void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const toDisplayDate = (date: string) => {
  return new Date(date).toDateString();
};

const PlanDay = ({ planDay, recipes = [], onPhotoClick, onRecipeClick }: IPlanDayProps): ReactElement => (
  <article className="bg-green-50 py-3 px-5 rounded-lg shadow-2xl h-full flex flex-col">
    <h3 className="text-center font-serif text-lg text-green-500 mb-5">
      {toDisplayDate(planDay.date)}
    </h3>
    <div className="flex flex-col flex-1">
      {planDay.meals.map((meal, i) => (
        <PlanMeal meal={meal} key={i} onPhotoClick={onPhotoClick} recipes={recipes} onRecipeClick={onRecipeClick}/>
      ))}
    </div>
  </article>
);

export default PlanDay;
