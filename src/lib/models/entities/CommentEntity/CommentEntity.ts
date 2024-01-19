import { AccountEntity } from '../AccountEntity/AccountEntity';
import { RecipeEntity } from '../RecipeEntity/RecipeEntity';

export type CommentEntity = {
  id: number;
  recipe_id: RecipeEntity['id'];
  account_id: AccountEntity['uid'];
  comment?: string;
  image?: string;
  created_at?: Date;
  updated_at?: Date;
  isDeleted?: boolean;
  Recipe?: RecipeEntity;
  Account?: AccountEntity;
};
