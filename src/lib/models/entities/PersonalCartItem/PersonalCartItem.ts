import { AccountEntity } from "../AccountEntity/AccountEntity";
import { IngredientEntity } from "../IngredientEntity/IngredientEntity";

export type PersonalCartItem = {
  id: number;
  ingredient_id: number;
  account_id: string;
  amount: number;
  is_bought: boolean;
  ingredient: IngredientEntity;
  account: AccountEntity;
};
