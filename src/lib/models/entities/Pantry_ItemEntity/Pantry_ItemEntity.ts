import { IngredientEntity } from "../IngredientEntity/IngredientEntity";
import { AccountEntity } from "../AccountEntity/AccountEntity";

export type Pantry_ItemEntity = {
  id: number;
  account_id?: string;
  ingredient_id?: number;
  amount?: number;
  account?: AccountEntity;
  IngredientEntity?: IngredientEntity;
};
