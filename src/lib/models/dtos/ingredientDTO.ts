import { NutritionInfo } from "./common";

//#region GET

//#region /api/v2/Ingredient/getall

export type IngredientGetAllResponse = {
  id: number;
  name: string;
  image: string;
  nutrition_info_id: number;
  type_id: number;
  isLiquid: boolean;
  ratio: number;
  amount: number;
  note: string;
  ingredient_type: {
    id: number;
    name: string;
  };
  nutrition_info: NutritionInfo;
}[];

//#endregion

//#endregion
