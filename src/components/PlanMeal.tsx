import React, { ReactElement, useContext } from 'react';
import type { IMeal, MealType } from 'src/types';
import { RecipesContext } from './RecipesContext';

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

const rexMealWithRecipe = /(@[a-z-]+)/g;

const RecipeMeal = ({ value }: { value: string }) => {
  const { recipes, setActiveRecipe } = useContext(RecipesContext);
  const recipe = recipes.find((r) => r.slug === value);

  if (!recipe) return <span>{value}</span>;

  // @TODO: Create new component <InlineButton /> that encapsulates accessibility.
  return (
    <a
      href="#"
      onClick={() => setActiveRecipe(recipe)}
      className="hover:text-blue-600 text-blue-400"
      role="button"
    >
      {recipe.title}
    </a>
  );
};

const parseMealValue = (mealValue: string) => {
  return mealValue
    .split(rexMealWithRecipe)
    .map((value: string) =>
      value.startsWith('@') ? (
        <RecipeMeal value={value.slice(1)} />
      ) : (
        <span>{value}</span>
      )
    );
};

const PlanMeal = ({ meal }: IPlanMealProps): ReactElement => {
  const { title, color } = MEAL_TYPE_CONFIG[meal.type];
  return (
    <section className="flex-1">
      <h4 className={`font-semibold text-${color}-500`}>{title}</h4>
      <p className="text-green-900">{parseMealValue(meal.value)}</p>
    </section>
  );
};

export default PlanMeal;
