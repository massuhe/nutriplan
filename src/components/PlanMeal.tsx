import React, { ReactElement, useContext } from 'react';
import type { IMeal, MealType } from 'src/types';
import { PlanContext } from './PlanContext';
import PlanMealValue from './PlanMealValue';

interface IPlanMealProps {
  meal: IMeal;
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

const PlanMeal = ({ meal }: IPlanMealProps): ReactElement => {
  const { title, color } = MEAL_TYPE_CONFIG[meal.type];
  const { setActivePhoto } = useContext(PlanContext);

  return (
    <section className="my-2">
      <div className="flex justify-between border-b-2">
        <h4 className={`font-semibold text-${color}-500`}>{title}</h4>
        <div>
          <button
            className={`p-0.5 rounded text-white text-xs ${
              meal.photo ? 'bg-red-400' : 'bg-gray-300'
            }`}
            onClick={() => setActivePhoto(meal?.photo || '')}
          >
            Foto
          </button>
        </div>
      </div>
      <PlanMealValue meal={meal} />
    </section>
  );
};

export default PlanMeal;
