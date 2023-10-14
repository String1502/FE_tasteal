import { ingredients } from "@/types/sampleData";
import { IngredientEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

/**
 * Represents a service for managing ingredients.
 */
class IngredientService {
  /**
   * Retrieves all ingredients.
   *
   * @return {Promise<IngredientEntity[]>} A promise that resolves with an array of IngredientEntity objects.
   */
  public static GetAllIngredients(): Promise<IngredientEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the ingredients array
    return Promise.resolve(ingredients);
  }
}

export default IngredientService;
