import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type RecipeToCookBookReq = {
  cook_book_id: CookBookEntity['id'];
  recipe_id: RecipeEntity['id'];
};
