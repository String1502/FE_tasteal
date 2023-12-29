import { getApiUrl } from '../constants/api';
import { IngredientRes } from '../models/dtos/Response/IngredientRes/IngredientRes';
import { IngredientEntity } from '../models/entities/IngredientEntity/IngredientEntity';
import { Ingredient_TypeEntity } from '../models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';

/**
 * Represents a service for managing ingredients.
 */
class IngredientService {
  /**
   * Retrieves all ingredients.
   *
   * @return {Promise<IngredientEntity[]>} A promise that resolves with an array of IngredientEntity objects.
   */
  public static async GetAll(): Promise<(IngredientEntity & IngredientRes)[]> {
    return await fetch(getApiUrl('GetAllIngredients'))
      .then((res) => res.json())
      .then((data) => data)
      .catch((error) => {
        console.log(error);
      });
  }

  public static async GetAllIngredientTypes(): Promise<
    Ingredient_TypeEntity[]
  > {
    const ingredients = await this.GetAll();

    return ingredients
      .map((ingredient) => {
        return ingredient?.ingredient_type;
      })
      .filter(
        (ingredient, index, self) =>
          ingredient &&
          self.findIndex((item) => item.id == ingredient.id) === index
      ) as Ingredient_TypeEntity[];
  }
}

export default IngredientService;
