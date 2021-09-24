import React from 'react';
import type { IMeal, IRecipe, MealType } from 'src/types';
import PlanMealValue from './PlanMealValue';

interface IPlanMealProps {
  meal: IMeal;
  recipes: IRecipe[] | void;
  onPhotoClick: (activePhoto: string) => void;
  onRecipeClick: (recipe: IRecipe) => void;
}

const MEAL_TYPE_CONFIG: {
  [index in MealType]: { title: string; color: string };
} = {
  breakfast: {
    title: 'Desayuno',
    color: 'blue',
  },
  lunch: {
    title: 'Almuerzo',
    color: 'red',
  },
  snack: {
    title: 'Merienda',
    color: 'yellow',
  },
  dinner: {
    title: 'Cena',
    color: 'green',
  },
};

const PlanMeal = ({
  meal,
  recipes = [],
  onPhotoClick,
  onRecipeClick,
}: IPlanMealProps): JSX.Element => {
  const { title, color } = MEAL_TYPE_CONFIG[meal.type];

  return (
    <section className="my-2">
      <div className="flex justify-between border-b-2">
        <h4 className={`font-semibold text-${color}-500`}>{title}</h4>
        <div>
          <button
            className={`p-0.5 rounded text-white text-xs ${
              meal.photo ? 'bg-red-400' : 'bg-gray-300'
            }`}
            onClick={() => onPhotoClick(meal?.photo || '')}
          >
            Foto
          </button>
        </div>
      </div>
      <PlanMealValue
        meal={meal}
        recipes={recipes}
        onRecipeClick={onRecipeClick}
      />
    </section>
  );
};

export default PlanMeal;
