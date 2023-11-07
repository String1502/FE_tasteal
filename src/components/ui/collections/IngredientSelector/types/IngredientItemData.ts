/**
 * Represents the data for an ingredient item.
 */
type IngredientItemData = {
  id: string; // The unique identifier for the ingredient item.
  ingredientId: number; // The ingredient id (database).
  name: string; // The name of the ingredient.
  amount: number; // The amount of the ingredient.
  isLiquid: boolean; // Indicate if this ingredient can be liquid.
};

export default IngredientItemData;
