import { ingredients } from "@/types/sampleData";
import { IngredientEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { API_PATH } from "../constants/common";

/**
 * Represents a service for managing ingredients.
 */
class IngredientService {
  /**
   * Retrieves all ingredients.
   *
   * @return {Promise<IngredientEntity[]>} A promise that resolves with an array of IngredientEntity objects.
   */
  public static async GetAll(): Promise<IngredientEntity[]> {
    let result: IngredientEntity[] = [];
    await fetch(`${API_PATH}/api/v2/Ingredient/getall`)
      .then((res) => res.json())
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
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
