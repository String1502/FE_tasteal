import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type RecommendMealPlanReq = {
  recipe_ids: RecipeEntity['id'][];
  weight?: number;
  height?: number;
  age?: number;
  gender?: boolean;
  rate?: number;
  intend?: boolean | null;
};
