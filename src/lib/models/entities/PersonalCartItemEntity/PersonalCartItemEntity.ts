import { AccountEntity } from '../AccountEntity/AccountEntity';
import { Cart_ItemEntity } from '../Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '../IngredientEntity/IngredientEntity';

export type PersonalCartItemEntity = {
  id: number;
  ingredient_id?: number;
  account_id: string;
  name?: string;
  amount: number;
  is_bought: boolean;
  ingredient: IngredientEntity;
  account: AccountEntity;
};

export const convertPersonalCartItemToCartItem = (
  personalCartItem: PersonalCartItemEntity
) => {
  return {
    cartId: personalCartItem.id,
    ingredientId: personalCartItem.ingredient_id,
    amount: personalCartItem.amount,
    isBought: personalCartItem.is_bought,
    ingredient: personalCartItem.ingredient,
  } as Cart_ItemEntity;
};
