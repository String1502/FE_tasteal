import { CaloriesReq } from '../CaloriesReq/CaloriesReq';

export type RecipeSearchReq = {
    IngredientID?: number[];
    ExceptIngredientID?: number[];
    OccasionID?: number[];
    KeyWords?: number[];
    TotalTime?: number;
    ActiveTime?: number;
    Calories?: CaloriesReq;
    TextSearch?: string;
};
export const initRecipeSearchReq: RecipeSearchReq = {
    IngredientID: null,
    ExceptIngredientID: null,
    OccasionID: null,
    KeyWords: null,
    TotalTime: null,
    ActiveTime: null,
    Calories: null,
    TextSearch: null,
};
export type RecipeSearchReq_Key = keyof typeof initRecipeSearchReq;

export function isValidRecipeSearchReq(
    recipeSearchReq: RecipeSearchReq
): boolean {
    const keys = Object.keys(initRecipeSearchReq);

    for (let i = 0; i < keys.length; i++) {
        if (recipeSearchReq[keys[i]]) {
            return true;
        }
    }
    return false;
}
