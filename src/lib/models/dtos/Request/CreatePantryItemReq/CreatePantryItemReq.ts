import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';

export type CreatePantryItemReq = {
  account_id: AccountEntity['uid'];
  ingredient_id: IngredientEntity['id'];
  number: number;
};
