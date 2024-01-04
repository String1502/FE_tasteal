import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type RecipeToCartReq = {
  account_id: AccountEntity['uid'];
  recipe_ids: RecipeEntity['id'][];
};
