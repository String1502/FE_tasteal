import { OccasionEntity } from "../OccasionEntity/OccasionEntity";
import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type Recipe_OccasionEntity = {
  occasion_id: number;
  recipe_id: number;
  OccasionEntity: OccasionEntity;
  RecipeEntity: RecipeEntity;
};
