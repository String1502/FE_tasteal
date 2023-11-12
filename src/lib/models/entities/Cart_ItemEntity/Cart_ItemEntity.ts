import { CartEntity } from "../CartEntity/CartEntity";
import { IngredientEntity } from "../IngredientEntity/IngredientEntity";

export type Cart_ItemEntity = {
  cartId: number;
  ingredientId: number;
  amount: number;
  isBought: boolean;
  cart?: CartEntity;
  ingredient?: IngredientEntity;
};
