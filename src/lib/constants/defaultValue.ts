import { IngredientItemData } from "@/components/ui/collections/IngredientSelector/types";
import { DEFAULT_UNIT_OPTION } from "./options";

/**
 * This constant represents the default data for an ingredient item.
 */
export const DEFAULT_INGREDIENT_ITEM_DATA: IngredientItemData = {
  id: "default",
  ingredientId: 0,
  name: "",
  amount: 0,
  unit: DEFAULT_UNIT_OPTION,
};
