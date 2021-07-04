import React, { ReactElement } from 'react';
import type { IRecipe } from 'src/types';

interface IRecipeModal {
  recipe?: IRecipe;
}

const RecipeModal = ({ recipe }: IRecipeModal): ReactElement => {
  if (!recipe) return <></>;
  return <div>{recipe.title}</div>;
};

export default RecipeModal;
