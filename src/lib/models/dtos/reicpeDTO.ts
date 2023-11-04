//#region POST

export type Ingredient = {
  name: string;
  amount: number;
  isLiquid: boolean;
};

export type Direction = {
  step: number;
  direction: string;
  image: string;
};

/**
 * Represents a recipe post model.
 * This is used for post request.
 */
export type RecipePostModel = {
  name: string;
  rating: number;
  image: string;
  totalTime: string;
  activeTime: string;
  servingSize: number;
  introduction: string;
  authorNote: string;
  isPrivate: boolean;
  author: string;
  ingredients: Ingredient[];
  directions: Direction[];
};

//#endregion
