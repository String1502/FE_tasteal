import { PlanEntity } from "../PlanEntity/PlanEntity";
import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type Plan_ItemEntity = {
  id: number;
  planId: number;
  recipeId: number;
  serving_size: number;
  order: number;
  plan?: PlanEntity;
  recipe?: RecipeEntity;
};
