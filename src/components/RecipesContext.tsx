import React, { ReactElement } from 'react';
import type { IRecipe } from 'src/types';

interface IRecipesContextWrapperProps {
  children: ReactElement[];
  recipes: IRecipe[];
  setActiveRecipe: (recipe: IRecipe) => void;
}

interface IRecipeContextValue {
  recipes: IRecipe[];
  setActiveRecipe: (recipe: IRecipe) => void;
}

export const RecipesContext = React.createContext<IRecipeContextValue>({
  recipes: [],
  setActiveRecipe: () => ({}),
});

const RecipesContextWrapper = ({
  children,
  recipes,
  setActiveRecipe,
}: IRecipesContextWrapperProps): ReactElement => {
  return (
    <RecipesContext.Provider value={{ recipes, setActiveRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextWrapper;
