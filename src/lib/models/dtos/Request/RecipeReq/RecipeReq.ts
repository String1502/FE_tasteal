import { RecipeDirectionReq } from '../RecipeDirectionReq/RecipeDirectionReq';
import { Recipe_IngredientReq } from '../Recipe_IngredientReq/Recipe_IngredientReq';

export type RecipeReq = {
    name: string;
    rating: number;
    image?: string;
    totalTime?: string;
    active_time?: string;
    serving_size: number;
    introduction?: string;
    author_note?: string;
    is_private?: boolean;
    author?: string;
    ingredients?: Recipe_IngredientReq[];
    directions?: RecipeDirectionReq[];
};
