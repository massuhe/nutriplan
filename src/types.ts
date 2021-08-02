// TODO: Move to /types/common.ts
export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface IMeal {
  type: MealType;
  value: string;
  editable?: boolean;
  photo?: string;
}

export interface IPlan {
  name: string;
  startDate: string;
  recipes: IRecipe[];
  days: IPlanDay[];
}

export type IngredientGroup = { group: string; ingredients: string[] };

export type IIngredients = string | IngredientGroup;

export interface IRecipe {
  slug: string;
  title: string;
  ingredients: IIngredients[];
  process: string;
}

export interface IPlanDay {
  date: string;
  meals: IMeal[];
}

export interface IModalContent {
  onClose: () => void;
}
