import { Nutrition_InfoReq } from '../Nutrition_InfoReq/Nutrition_InfoReq';

export type CreateIngredientReq = {
  name: string;
  image: string;
  isLiquid: boolean;
  ratio: number;
  ingredient_type: {
    id: number;
  };
  nutrition_info: Nutrition_InfoReq;
};

export type UpdateIngredientReq = CreateIngredientReq & {
  id: number;
};
