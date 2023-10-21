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
  public static GetAll(): Promise<IngredientEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the ingredients array
    return Promise.resolve(ingredients);
  }

  /**
   * Retrieves ingredients by ids.
   *
   * @param {number[]} ids - An array of ids.
   * @return {Promise<IngredientEntity[]>} A promise that resolves with an array of IngredientEntity objects.
   */
  public static GetByIds(ids: number[]): Promise<IngredientEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    if (ids.length <= 0) {
      return Promise.resolve([]);
    }

    return Promise.resolve(ingredients.filter((i) => ids.includes(i.id)));
  }
}

export default IngredientService;
