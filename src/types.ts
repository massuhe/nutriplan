export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface IMeal {
  type: MealType;
  value: string;
  editable?: boolean;
}

export interface IPlan {
  name: string;
  startDate: string;
  recipes: IRecipe[];
  days: IPlanDay[];
}

export interface IRecipe {
  slug: string;
  title: string;
  ingredients: string[];
  process: string;
}

export interface IPlanDay {
  date: string;
  meals: IMeal[];
}
