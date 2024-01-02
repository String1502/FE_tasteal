import { IngredientEntity } from '../IngredientEntity/IngredientEntity';
import { PantryEntity } from '../PantryEntity/PantryEntity';

export type Pantry_ItemEntity = {
  id: number;
  pantry_id?: number;
  ingredient_id?: number;
  amount: number;
  Pantry?: PantryEntity;
  Ingredient?: IngredientEntity;
};
