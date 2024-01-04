import { getApiUrl } from '../constants/api';
import { PageReq } from '../models/dtos/Request/PageReq/PageReq';
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
  public static async GetAll(
    pageSize: number = 1000000,
    page: number = 1
  ): Promise<(IngredientEntity & IngredientRes)[]> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        pageSize: pageSize,
        page: page,
      } as PageReq),
    };
    return await fetch(getApiUrl('GetAllIngredients'), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        return data.ingredients;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public static async GetAll2(): Promise<IngredientsGetRes> {
    const body = {
      page: 1,
      pageSize: 2147483647,
    };

    const res = await fetch(getApiUrl('GetAllIngredients'), {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
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

  public static async DeleteIngredient(
    id: IngredientEntity['id']
  ): Promise<boolean> {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(
      `${getApiUrl('DeleteIngredient')}?id=${id}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        return data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

export type IngredientsGetRes = {
  maxPage: number;
  ingredients: IngredientRes[];
};

export default IngredientService;
