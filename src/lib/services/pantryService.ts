import { getApiUrl } from '../constants/api';
import {
  RecipesIngreAny,
  RecipesPantryAny,
} from '../models/dtos/Request/PantryReq/PantryReq';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';

class PantryService {
  public static async GetRecipesByIngredientsAny(
    recipesIngreAny: RecipesIngreAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesIngreAny),
    };

    return await fetch(
      `${getApiUrl('GetRecipesByIngredientsAny')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByIngredientsAll(
    recipesIngreAll: RecipesIngreAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesIngreAll),
    };

    return await fetch(
      `${getApiUrl('GetRecipesByIngredientsAll')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByPantryIdAny(
    recipesPantryAny: RecipesPantryAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesPantryAny),
    };

    return await fetch(
      `${getApiUrl('GetRecipesByPantryIdAny')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async GetRecipesByPantryIdAll(
    recipesPantryAll: RecipesPantryAny
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipesPantryAll),
    };

    return await fetch(
      `${getApiUrl('GetRecipesByPantryIdAll')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }
}

export default PantryService;
