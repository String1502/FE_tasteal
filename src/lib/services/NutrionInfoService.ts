import { nutritionInfos } from "@/types/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";

/**
 * Represents a service for managing nutrion nutrition infos.
 */
class NutritionService {
  /**
   * Get nutrition info by id
   *
   * @param id - The id of the nutrition
   */
  public static GetById(id: number) {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(
      nutritionInfos.find((nutrition) => nutrition.id === id)
    );
  }
}

export default NutritionService;
