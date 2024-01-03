import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import { RecipeDirectionReq } from '../RecipeDirectionReq/RecipeDirectionReq';
import { Recipe_IngredientReq } from '../Recipe_IngredientReq/Recipe_IngredientReq';
import { PageReq } from '../PageReq/PageReq';

export type RecipeReq = {
  name: string;
  rating?: number;
  image?: string;
  totalTime?: number;
  active_time?: number;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  author: string;
  ingredients?: Recipe_IngredientReq[];
  directions?: RecipeDirectionReq[];
  occasions?: OccasionEntity['id'][];
};

export type RecipeByUids = {
  uids: string[];
  page: PageReq;
};
