import { getApiUrl } from '../constants/api';
import { IngredientRes } from '../models/dtos/Response/IngredientRes/IngredientRes';

/**
 * Represents a service for managing ingredients.
 */
class IngredientService {
  /**
   * Retrieves all ingredients.
   *
   * @return {Promise<IngredientEntity[]>} A promise that resolves with an array of IngredientEntity objects.
   */
  public static async GetAll(): Promise<IngredientRes[]> {
    let result: IngredientRes[] = [];
    await fetch(getApiUrl('GetAllIngredients'))
      .then((res) => res.json())
      .then((data) => {
        result = data;
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
  }
}

export default IngredientService;
