import { Recipe_IngredientEntity } from "@/lib/models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity";

type IngredientDisplayerItemListProps = {
  ingredients: Recipe_IngredientEntity[];
  servingSize: number;
};

export default IngredientDisplayerItemListProps;
