import { RecipeEntity } from "../RecipeEntity/RecipeEntity";
import { CookBookEntity } from "../CookBookEntity/CookBookEntity";

export type CookBook_RecipeEntity = {
  cook_book_id: number;
  recipe_id: number;
  cook_book?: CookBookEntity;
  RecipeEntity?: RecipeEntity;
};
