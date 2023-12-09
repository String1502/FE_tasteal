/**
 * Represents the data for an ingredient item.
 */
type IngredientItemData = {
    id: string; // The unique identifier for the ingredient item.
    ingredientId: number; // The ingredient id (database).
    name: string; // The name of the ingredient.
    amount: number; // The amount of the ingredient.
};

export default IngredientItemData;
