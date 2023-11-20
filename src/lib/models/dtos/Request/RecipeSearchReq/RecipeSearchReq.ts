import { CaloriesReq } from "../CaloriesReq/CaloriesReq";

export type RecipeSearchReq = {
  IngredientID?: number[];
  ExceptIngredientID?: number[];
  OccasionID?: number[];
  KeyWords?: number[];
  TotalTime?: number;
  ActiveTime?: number;
  Calories?: CaloriesReq;
  TextSearch?: string;
  KeyWordsFormat?: string[];
};
