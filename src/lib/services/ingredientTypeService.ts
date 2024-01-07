import { getApiUrl } from '../constants/api';
import { Ingredient_TypeEntity } from '../models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';

class IngredientTypeService {
  public static async GetAllIngredientTypes(): Promise<
    Ingredient_TypeEntity[]
  > {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(getApiUrl('GetAllIngredientTypes'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async GetIngredientTypeById(
    id: Ingredient_TypeEntity['id']
  ): Promise<Ingredient_TypeEntity> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl('GetIngredientById')}/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async DeleteIngredientType(
    id: Ingredient_TypeEntity['id']
  ): Promise<Ingredient_TypeEntity> {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl('DeleteIngredientType')}/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async AddIngredientType({
    name,
  }: {
    name: Ingredient_TypeEntity['name'];
  }): Promise<Ingredient_TypeEntity> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ name }),
    };

    return await fetch(`${getApiUrl('AddIngredientType')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  public static async UpdateIngredientType(
    updateData: Ingredient_TypeEntity
  ): Promise<boolean> {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(updateData),
    };

    return await fetch(`${getApiUrl('UpdateIngredientType')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }
}

export default IngredientTypeService;
