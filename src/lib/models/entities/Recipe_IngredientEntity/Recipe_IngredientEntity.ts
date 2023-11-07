import { IngredientEntity } from "../IngredientEntity/IngredientEntity";
import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type Recipe_IngredientEntity = {
  recipe_id: number;
  ingredient_id: number;
  amount?: number;
  note?: string;
  is_required?: boolean;
  recipe?: RecipeEntity;
  ingredient?: IngredientEntity;
};
