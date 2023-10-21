import { recipes } from "@/types/sampleData";
import { RecipeEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

/**
 * Represents a service for managing recipes.
 */
class RecipeService {
  /**
   * Retrieves all recipes.
   *
   * @return {Promise<RecipeEntity[]>} A promise that resolves with an array of
   * RecipeEntity objects.
   */
  public static GetAll(): Promise<RecipeEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the ingredients array
    return Promise.resolve(recipes);
  }

  /**
   * Fetch recipe by Id.
   *
   * @param {number} id - The id of the recipe.
   * @returns {RecipeEntity | undefined} The recipe.
   */
  public static GetById(id: number): Promise<RecipeEntity | undefined> {
    // Stimulate delay of 1 second
    simulateDelay(1);

    const recipe = recipes.find((recipe) => recipe.id === id);

    return Promise.resolve(recipe);
  }
}

export default RecipeService;
