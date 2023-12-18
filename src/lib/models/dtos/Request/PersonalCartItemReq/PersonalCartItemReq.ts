import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';

export type PersonalCartItemReq = {
  ingredient_id: IngredientEntity['id'];
  account_id: AccountEntity['uid'];
  amount: Cart_ItemEntity['amount'];
  is_bought: Cart_ItemEntity['isBought'];
};
