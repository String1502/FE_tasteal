import { RecipeEntity } from '../RecipeEntity/RecipeEntity';
import { CookBookEntity } from '../CookBookEntity/CookBookEntity';

export type CookBook_RecipeEntity = {
    id: number;
    cook_book_id: number;
    recipe_id: number;
    cook_book?: CookBookEntity;
    recipe?: RecipeEntity;
};
