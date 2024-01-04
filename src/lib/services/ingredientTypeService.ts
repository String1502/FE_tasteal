import { getApiUrl } from '../constants/api';

class IngredientTypeService {
  public static Get(page?: number, pageSize?: number) {
    return fetch(getApiUrl('GetAllIngredientTypes'), {
      method: 'GET',
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Failed to get ingredients');
    });
  }
}
export default IngredientTypeService;
