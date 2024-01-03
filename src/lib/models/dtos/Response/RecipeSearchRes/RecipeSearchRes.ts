import { AccountEntity } from '../../../entities/AccountEntity/AccountEntity';
import { IngredientEntity } from '../../../entities/IngredientEntity/IngredientEntity';
import { Recipe_DirectionEntity } from '../../../entities/Recipe_DirectionEntity/Recipe_DirectionEntity';
import { Nutrition_InfoEntity } from '../../../entities/Nutrition_InfoEntity/Nutrition_InfoEntity';

export type RecipeSearchRes = {
  id: number;
  name?: string;
  rating?: number;
  totalTime?: number;
  active_time?: Date;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  is_private: boolean;
  image?: string;
  author: string;
  nutrition_info_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  account?: AccountEntity;
  nutrition_info?: Nutrition_InfoEntity;
  ingredients?: IngredientEntity;
  direction?: Recipe_DirectionEntity;
  calories?: number;
};
