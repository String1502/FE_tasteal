import { recipeDirections } from "@/lib/constants/sampleData";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { Recipe_DirectionEntity } from "../models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity";

/**
 * Page identifier for debug purpose.
 */
const PAGE_ID = "DirectionService";

/**
 * Format log string with page id.
 */
const debugStringFormatter = createDebugStringFormatter(PAGE_ID);

/**
 * Represents a service for managing direction.
 */
class RecipeDirectionService {
  /**
   * Retrieves all directions.
   *
   * @return {Promise<Recipe_DirectionEntity[]>} A promise that resolves with an array of Recipe_DirectionEntity objects.
   */
  public static GetAll(): Promise<Recipe_DirectionEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the directions array
    return Promise.resolve(recipeDirections);
  }

  /**
   * Fetch directions of a recipe by id.
   *
   * @param {number} id - The id of the recipe.
   * @returns {Recipe_DirectionEntity[]} The recipe.
   */
  public static GetByRecipeId(
    recipeId: number
  ): Promise<Recipe_DirectionEntity[]> {
    if (recipeId <= 0) {
      console.log(debugStringFormatter("Invalid recipe id"));
      Promise.resolve([]);
    }

    // Stimulate delay of 1 second
    simulateDelay(1);

    const result = recipeDirections.filter(
      (direction) => direction.recipe_id === recipeId
    );

    return Promise.resolve(result);
  }
}

export default RecipeDirectionService;
