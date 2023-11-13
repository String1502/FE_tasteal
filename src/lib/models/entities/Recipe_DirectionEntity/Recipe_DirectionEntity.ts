import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type Recipe_DirectionEntity = {
  recipe_id?: number;
  step?: number;
  direction?: string;
  image?: string;
  RecipeEntity?: RecipeEntity;
};
