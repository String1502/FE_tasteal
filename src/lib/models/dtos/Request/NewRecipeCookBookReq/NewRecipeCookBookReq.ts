import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';

export type NewRecipeCookBookReq = {
  cookbook_recipe_id: CookBook_RecipeEntity['id'];
  cookbook_id: CookBookEntity['id'];
};
