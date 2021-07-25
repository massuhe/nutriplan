import React, { ReactElement, useState } from 'react';
import type { IRecipe } from 'src/types';

interface IPlanContextData {
  recipes: IRecipe[];
  setModalType: (type: string) => void;
}

interface IPlanContextProviderValue {
  recipes: IRecipe[];
  activePhoto: string;
  activeRecipe: IRecipe | void;
  setActiveRecipe: (recipe: IRecipe) => void;
  setActivePhoto: (photo: string) => void;
}

interface IPlanContextWrapperProps {
  children: ReactElement[];
  data: IPlanContextData;
}

export const PlanContext = React.createContext<IPlanContextProviderValue>({
  recipes: [],
  activePhoto: '',
  activeRecipe: undefined,
  setActiveRecipe: () => ({}),
  setActivePhoto: () => ({}),
});

const RecipesContextWrapper = ({
  children,
  data,
}: IPlanContextWrapperProps): ReactElement => {
  const [activeRecipe, setActiveRecipe] = useState<IRecipe>();
  const [activePhoto, setActivePhoto] = useState<string>('');

  const { setModalType, recipes } = data;

  const decorateWithSetModalType =
    (type: string) =>
    (fn) =>
    (...args) => {
      setModalType(type);
      fn(...args);
    };

  const value: IPlanContextProviderValue = {
    activePhoto,
    activeRecipe,
    recipes,
    setActivePhoto: decorateWithSetModalType('photo')(setActivePhoto),
    setActiveRecipe: decorateWithSetModalType('recipe')(setActiveRecipe),
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
};

export default RecipesContextWrapper;
