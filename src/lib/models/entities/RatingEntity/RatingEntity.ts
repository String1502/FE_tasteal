import { AccountEntity } from '../AccountEntity/AccountEntity';
import { RecipeEntity } from '../RecipeEntity/RecipeEntity';

export type RatingEntity = {
  id: number;
  recipe_id: number;
  account_id: string;
  rating: number;
  account?: AccountEntity;
  recipe?: RecipeEntity;
};
