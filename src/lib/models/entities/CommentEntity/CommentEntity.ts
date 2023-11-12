import { AccountEntity } from "../AccountEntity/AccountEntity";
import { RecipeEntity } from "../RecipeEntity/RecipeEntity";

export type CommentEntity = {
  id: number;
  recipe_id: number;
  account_id: string;
  comment?: string;
  Recipe: RecipeEntity;
  Account: AccountEntity;
};
