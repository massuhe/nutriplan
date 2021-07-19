import React, { ReactElement } from 'react';
import type { IngredientGroup, IIngredients, IRecipe } from 'src/types';
import Overlay from './Overlay';

interface IRecipeModal {
  recipe?: IRecipe;
  onClose: () => void;
}

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

const RecipeModal = ({ recipe, onClose }: IRecipeModal): ReactElement => {
  return (
    <Overlay visible={Boolean(recipe)} onOverlayClick={onClose}>
      <section className="bg-white h-full p-4 md:p-10 max-w-2xl flex flex-col shadow-2xl rounded-tl-2xl">
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
    </Overlay>
  );
};

export default RecipeModal;
