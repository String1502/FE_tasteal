import { PlanEntity } from '../PlanEntity/PlanEntity';
import { RecipeEntity } from '../RecipeEntity/RecipeEntity';

export type Plan_ItemEntity = {
  id: number | string;
  plan_id: number;
  recipe_id: number;
  serving_size: number;
  order: number;
  plan?: PlanEntity;
  recipe?: RecipeEntity;
};
