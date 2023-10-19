import { occasions as occasionsSampleData } from "@/types/sampleData";
import { OccasionEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

/**
 * Represents a service for managing occasions.
 */
class OccasionService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<OccasionEntity[]>}
   */
  public static GetAllOccasions(): Promise<OccasionEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the occasions array
    return Promise.resolve(occasionsSampleData);
  }

  public static async GetCurrentOccassions(): Promise<OccasionEntity> {
    // Simulate delay of 1 second
    simulateDelay(1);
    const occasions = await OccasionService.GetAllOccasions();
    if (occasions.length === 0) {
      occasionsSampleData.forEach((item) => {
        occasions.push(item);
      });
    }
    var index = 0;
    const date = new Date();
    occasions.forEach((item) => {
      const startDate = new Date(item.start_at);
      if (date >= startDate) {
        index = occasions.indexOf(item);
      }
    });
    return occasions[index];
  }
}

export default OccasionService;
