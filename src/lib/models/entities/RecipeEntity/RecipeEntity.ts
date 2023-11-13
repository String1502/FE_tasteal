import { AccountEntity } from "../AccountEntity/AccountEntity";
import { IngredientEntity } from "../IngredientEntity/IngredientEntity";
import { Nutrition_InfoEntity } from "../Nutrition_InfoEntity/Nutrition_InfoEntity";
import { Recipe_DirectionEntity } from "../Recipe_DirectionEntity/Recipe_DirectionEntity";

export type RecipeEntity = {
  id: number;
  name?: string;
  rating: number;
  totalTime?: Date;
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
  ingredients?: IngredientEntity[];
  direction?: Recipe_DirectionEntity[];
};
