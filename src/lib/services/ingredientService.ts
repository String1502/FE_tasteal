import { getApiUrl } from '../constants/api';
import {
  CreateIngredientReq,
  UpdateIngredientReq,
} from '../models/dtos/Request/IngredientReq/IngredientReq';
import { PageReq } from '../models/dtos/Request/PageReq/PageReq';
import {
  IngredientPagination,
  IngredientRes,
} from '../models/dtos/Response/IngredientRes/IngredientRes';
import { IngredientEntity } from '../models/entities/IngredientEntity/IngredientEntity';

export type IngredientGetRes = IngredientEntity & IngredientRes;

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
  ): Promise<IngredientGetRes[]> {
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
  public static async Get(
    page: number = 1,
    pageSize: number = 10
  ): Promise<IngredientPagination> {
    if (page < 1 || pageSize < 1) {
      throw new Error('Invalid page or pageSize');
    }
    return fetch(getApiUrl('GetAllIngredients'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        page: page,
        pageSize: pageSize,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to get ingredients');
    });
  }
  public static async GetById(id: number): Promise<IngredientEntity> {
    return fetch(`${getApiUrl('GetIngredientById')}/${id}`, {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  public static async DeleteIngredient(
    id: IngredientEntity['id']
  ): Promise<IngredientEntity> {
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

  public static Add(data: CreateIngredientReq) {
    const body = JSON.stringify(data);
    return fetch(getApiUrl('AddIngredient'), {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to add ingredient');
    });
  }
  public static Update(data: UpdateIngredientReq) {
    const body = JSON.stringify(data);
    return fetch(getApiUrl('UpdateIngredient') + '/' + data.id + '', {
      method: 'PUT',
      body: body,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to update ingredient');
    });
  }
}

export type IngredientsGetRes = {
  maxPage: number;
  ingredients: IngredientRes[];
};

export default IngredientService;
