import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { CaloriesReq } from '../CaloriesReq/CaloriesReq';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type RecipeSearchReq = {
    page?: number;
    pageSize?: number;
    IngredientID?: IngredientEntity['id'][];
    ExceptIngredientID?: IngredientEntity['id'][];
    OccasionID?: OccasionEntity['id'][];
    KeyWords?: string[];
    TotalTime?: RecipeEntity['totalTime'];
    Calories?: CaloriesReq;
};
export const initRecipeSearchReq: RecipeSearchReq = {
    page: null,
    pageSize: null,
    IngredientID: null,
    ExceptIngredientID: null,
    OccasionID: null,
    KeyWords: null,
    TotalTime: null,
    Calories: null,
};
