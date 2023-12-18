import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type CookBook_RecipeRes = {
    cook_book_id: CookBookEntity['id'];
    RecipeEntity?: RecipeEntity;
};
