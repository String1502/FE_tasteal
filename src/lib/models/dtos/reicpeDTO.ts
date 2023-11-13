import { Account, Direction, Ingredient, NutritionInfo } from "./common";

//#region POST

//#region /api/v2/Recipe/Add

//#region Request

/**
 * Represents a recipe post model.
 * This is used for post request.
 */
export type RecipePostModel = {
  name: string;
  rating: number;
  image: string;
  total_time: string;
  active_time: string;
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  author: string;
  ingredients: {
    id: number;
    amount: number;
    isLiquid: boolean;
  }[];
  directions: {
    step: number;
    direction: string;
    image: string;
  }[];
};

//#endregion

//#region Response

/**
 * Represents a recipe create response.
 */
export type RecipePostResponse = Partial<{
  id: number;
  name: string;
  rating: number;
  total_time: Date;
  active_time: Date;
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  image: string;
  author: string;
  nutrition_info_id: number;
  created_at: string;
  updated_at: string;
  account: Account;
  nutrition_info: NutritionInfo;
  ingredients: Ingredient[];
  direction: (Direction & { recipeEntity: string })[];
}>[];

//#endregion

//#endregion

//#region /api/v2/Recipe/GetRecipe

//#region Request (empty)

//#endregion

//#region Response

export type RelatedRecipe = {
  id: number;
  name: string;
  image: string;
  totalTime: string;
  rating: number;
  ingredientAmount: 0;
  author: {
    uid: string;
    name: string;
    avatar: string;
    introduction: string;
    recipeCount: number | null;
  };
};

/**
 * Represents a recipe get response.
 */
export type RecipeGetResponse = Partial<{
  name: string;
  rating: number;
  totalTime: string;
  serving_size: number;
  introduction: string;
  author_note: string | null;
  image: string;
  author: Account & { recipeCount: number | null };
  ingredients: {
    name: string;
    image: string;
    amount: number;
    isLiquid: boolean;
  }[];
  nutrition_info: NutritionInfo;
  directions: Omit<Direction, "recipe_id">[];
  comments: unknown[];
  createAt: string;
  relatedRecipes: RelatedRecipe[];
}>;

//#endregion

//#endregion

//#endregion
