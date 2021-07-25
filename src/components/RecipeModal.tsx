import React, { ReactElement, useContext } from 'react';
import type { IngredientGroup, IIngredients, IModalContent } from 'src/types';
import { PlanContext } from './PlanContext';

interface IIngredientsProps {
  ingredients: IIngredients[] | void;
}

const Ingredients = ({ ingredients }: IIngredientsProps): ReactElement => {
  const firstIngredient = ingredients?.[0];

  if (!firstIngredient) return <span>No ingredients</span>;

  if (typeof firstIngredient === 'string')
    return (
      <ul className="list-disc list-inside">
        {(ingredients as string[]).map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
    );

  return (
    <>
      {(ingredients as IngredientGroup[]).map((ingredient) => (
        <article key={ingredient.group}>
          <h4 className="font-serif mt-2">{ingredient.group}</h4>
          <ul className="list-disc list-inside">
            {ingredient.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
};

const RecipeModal = ({ onClose }: IModalContent): ReactElement => {
  const { activeRecipe: recipe } = useContext(PlanContext);

  return (
    <section className="w-full h-full bg-white p-4 flex flex-col shadow-2xl md:w-auto md:p-10 md:max-w-2xl md:rounded-tl-2xl">
      <button className="self-end" onClick={onClose}>
        ❎
      </button>
      <h2 className="font-serif text-3xl my-4">{recipe?.title}</h2>
      <article>
        <h3 className="font-serif text-2xl my-3">Ingredientes</h3>
        <Ingredients ingredients={recipe?.ingredients} />
      </article>
      <article>
        <h3 className="font-serif text-2xl my-3">Preparación</h3>
        <p>{recipe?.process}</p>
      </article>
    </section>
  );
};

export default RecipeModal;
