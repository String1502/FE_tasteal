import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { PageReq } from '../PageReq/PageReq';
import { PantryEntity } from '@/lib/models/entities/PantryEntity/PantryEntity';

export type RecipesIngreAny = {
  ingredients: IngredientEntity['id'][];
  page: PageReq;
};

export type RecipesPantryAny = {
  pantry_id: PantryEntity['id'];
  page: PageReq;
};
