import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type PlanReq = {
  account_id: AccountEntity['uid'];
  date: string;
  recipeIds: RecipeEntity['id'][];
};

export type PlanDeleteReq = {
  account_id: AccountEntity['uid'];
  date: string;
  recipeId: RecipeEntity['id'];
  order: number;
};
