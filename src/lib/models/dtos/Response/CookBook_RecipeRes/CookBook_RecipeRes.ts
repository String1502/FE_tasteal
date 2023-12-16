import { RecipeEntity } from "../../../ERD/RecipeEntity/RecipeEntity";

export type CookBook_RecipeRes = {
  cook_book_id: number;
  RecipeEntity?: RecipeEntity;
};
