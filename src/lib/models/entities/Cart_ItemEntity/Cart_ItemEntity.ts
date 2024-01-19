import { CartEntity } from '../CartEntity/CartEntity';
import { IngredientEntity } from '../IngredientEntity/IngredientEntity';

export type Cart_ItemEntity = {
  cartId: number;
  ingredient_id: number;
  amount: number;
  isBought: boolean;
  cart?: CartEntity;
  ingredient?: IngredientEntity;
};
