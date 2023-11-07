import { recipeIngredients } from "@/lib/constants/sampleData";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { Recipe_IngredientEntity } from "../models/entities/Recipe_IngredientEntity/Recipe_IngredientEntity";

/**
 * Page identifier for debug purpose.
 */
const PAGE_ID = "RecipeIngredientService";

/**
 * Format log string with page id.
 */
const debugStringFormatter = createDebugStringFormatter(PAGE_ID);

/**
 * Represents a service for managing direction.
 */
class RecipeIngredientService {
  /**
   * Retrieves all recipe's ingredients.
   *
   * @return {Promise<Recipe_IngredientEntity[]>} A promise that resolves with an array of Recipe_IngredientEntity objects.
   */
  public static GetAll(): Promise<Recipe_IngredientEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(recipeIngredients);
  }

  /**
   * Fetch recipe_ingredients of a recipe by id.
   *
   * @param {number} id - The id of the recipe.
   * @returns {Recipe_IngredientEntity[]} The recipe_ingredients.
   */
  public static GetByRecipeId(
    recipeId: number
  ): Promise<Recipe_IngredientEntity[]> {
    if (recipeId <= 0) {
      console.log(debugStringFormatter("Invalid recipe id"));
      Promise.resolve([]);
    }

    // Stimulate delay of 1 second
    simulateDelay(1);

    const result = recipeIngredients.filter(
      (direction) => direction.recipe_id === recipeId
    );

    return Promise.resolve(result);
  }
}

export default RecipeIngredientService;
