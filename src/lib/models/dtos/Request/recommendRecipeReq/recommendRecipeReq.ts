import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { PageReq } from '../../Request/PageReq/PageReq';

export type recommendRecipeReq = {
  IngredientIds: IngredientEntity['id'][];
  Page: PageReq;
};
