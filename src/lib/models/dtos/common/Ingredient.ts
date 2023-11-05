import { NutritionInfo } from ".";

export type Ingredient = {
  id: number;
  name: string;
  image: string;
  nutrition_info_id: number;
  type_id: number;
  is_liquid: boolean;
  ratio: number;
  amount: number;
  note: string;
  ingredient_type: {
    id: number;
    name: string;
  };
  nutrition_info: NutritionInfo;
};
