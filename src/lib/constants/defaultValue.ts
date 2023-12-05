import { IngredientItemData } from '@/components/ui/collections/IngredientSelector/types';
// import { DEFAULT_UNIT_OPTION } from "./options";
import { Nutrition_InfoEntity } from '../models/entities/Nutrition_InfoEntity/Nutrition_InfoEntity';

/**
 * This constant represents the default data for an ingredient item.
 */
// TODO: Move this to its own component file
export const DefaultIngredientItemData: IngredientItemData = {
    id: 'default',
    ingredientId: 0,
    name: '',
    amount: 0,
    isLiquid: false,
};

/**
 * This constant represents the default data for a nutrition info.
 */
// TODO: Move this to its own component file
export const DefaultNutritionValue: Nutrition_InfoEntity = {
    id: 0,
    calories: 0,
    fat: 0,
    saturated_fat: 0,
    trans_fat: 0,
    cholesterol: 0,
    carbohydrates: 0,
    fiber: 0,
    sugars: 0,
    protein: 0,
    sodium: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
};
