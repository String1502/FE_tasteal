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
export type RecipeCreateResponse = {
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
}[];

//#endregion

//#endregion

//#endregion
