import { getApiUrl } from '@/lib/constants/api';
import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import { DefaultPage } from '../constants/common';
import { PageFilter } from '../models/dtos/Request/PageFilter/PageFilter';
import { PageReq } from '../models/dtos/Request/PageReq/PageReq';
import {
  RecipeByUids,
  RecipeReq,
} from '../models/dtos/Request/RecipeReq/RecipeReq';
import { RecipeSearchReq } from '../models/dtos/Request/RecipeSearchReq/RecipeSearchReq';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';
import { NewRecipeCookBookReq } from '../models/dtos/Request/NewRecipeCookBookReq/NewRecipeCookBookReq';
import { RecipeToCookBookReq } from '../models/dtos/Request/RecipeToCookBook/RecipeToCookBook';

const DEBUG_IDENTIFIER = '[RecipeService]';
const createDebugString = createDebugStringFormatter(DEBUG_IDENTIFIER);

// Cache system
type RecipeCache = Map<number, RecipeRes>;
const recipeCache: RecipeCache = new Map();

/**
 * Represents a service for managing occasions.
 */
class RecipeService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<RecipeEntity[]>}
   */
  public static async GetAllRecipes(
    pageSize: number = 12,
    page: number = 1
  ): Promise<RecipeEntity[]> {
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

    return await fetch(getApiUrl('GetAllRecipe'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }
  /**
   * Get recipe detail data by id.
   * NOTE: This method is not implemented yet.
   *
   * @param id - The id of the recipe.
   * @returns - The recipe detail data.
   */
  public static async GetById(id: number): Promise<RecipeRes> {
    if (recipeCache.has(id)) {
      console.log('Use data in cache');
      return Promise.resolve(recipeCache.get(id));
    }

    const res = await fetch(`${getApiUrl('GetRecipeById')}?id=${id}`, {
      method: 'POST',
    });
    if (res.ok) {
      return res.json().then((data) => {
        recipeCache.set(id, data);
        return data;
      });
    }
    throw new Error(res.statusText);
  }

  /**
   * Fetch recipes that belong to a specific account.
   *
   * @param accountId - The id of the account.
   * @returns
   */
  public static async GetRecipesByUserId(
    recipeByUids: RecipeByUids
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipeByUids),
    };

    return await fetch(`${getApiUrl('GetRecipesByUserId')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data.recipes;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async GetRecipeByDateTime(
    limit: number
  ): Promise<RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        pageSize: limit,
        page: DefaultPage,
        isDescend: true,
      } as PageFilter),
    };

    return await fetch(getApiUrl('GetRecipeByDateTime'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async GetRecipeByRating(
    limit: number
  ): Promise<RecipeEntity[]> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        pageSize: limit,
        page: DefaultPage,
        isDescend: true,
      } as PageFilter),
    };

    return await fetch(getApiUrl('GetRecipeByRating'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async SearchRecipes(
    filter: RecipeSearchReq
  ): Promise<RecipeEntity[]> {
    let recipes: RecipeEntity[] = [];

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        ...filter,
      }),
    };

    await fetch(getApiUrl('SearchRecipe'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        recipes = data;
      })
      .catch((error) => {
        console.log('Lỗi:', error);
        console.error('Lỗi:', error);
      });

    return recipes;
  }
  //#region POST

  /**
   * Create a new recipe
   */
  public static async CreateRecipe(postData: RecipeReq) {
    return await fetch(getApiUrl('CreateRecipe'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((e) => {
        console.error(createDebugString('POST failed!', 'CreateRecipe'), e);
      });
  }

  //#endregion

  public static async GetKeyWords(): Promise<string[]> {
    const requestOptions = {
      method: 'GET',
    };

    return await fetch(getApiUrl('GetKeyWords'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async MoveRecipeToNewCookbook(
    moveInfor: NewRecipeCookBookReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(moveInfor),
    };

    return await fetch(
      `${getApiUrl('MoveRecipeToNewCookbook')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async AddRecipeToCookBook(
    addInfor: RecipeToCookBookReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(addInfor),
    };

    return await fetch(`${getApiUrl('AddRecipeToCookBook')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async Update(recipeId: number, updateData: RecipeReq) {
    const res = await fetch(getApiUrl('UpdateRecipe', recipeId.toString()), {
      method: 'PUT',
      body: JSON.stringify(updateData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  }

  public static async Delete(recipeId: number): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl('DeleteRecipe')}?recipeId=${recipeId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }
}

export default RecipeService;
