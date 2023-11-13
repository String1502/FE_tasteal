import { AccountEntity } from "../AccountEntity/AccountEntity";
import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type CartEntity = {
  id: number;
  accountId: string;
  recipeId: number;
  serving_size: number;
  account?: AccountEntity;
  recipe?: RecipeEntity;
};
