import simulateDelay from '@/utils/promises/stimulateDelay';
import { CookBook_RecipeEntity } from '../models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import {
  cookbookRecipes as cookbookRecipeSampleData,
  cookbooks,
  recipes,
} from '../constants/sampleData';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import { getApiUrl } from '../constants/api';
class CookbookRecipeService {
  public static GetAllCookbookRecipes(): Promise<CookBook_RecipeEntity[]> {
    simulateDelay(1);

    let cookbookRecipes: CookBook_RecipeEntity[] = cookbookRecipeSampleData.map(
      (item) => {
        return {
          ...item,
          cook_book: cookbooks.find((book) => book.id === item.cook_book_id),
          RecipeEntity: recipes.find((res) => res.id === item.recipe_id),
        };
      }
    );

    return Promise.resolve(cookbookRecipes);
  }

  public static async GetCookBookRecipeByCookBookId(
    cookBookId: CookBookEntity['id']
  ): Promise<CookBook_RecipeEntity[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(
      `${getApiUrl('GetCookBookRecipeByCookBookId')}?cookBookId=${cookBookId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async DeleteCookBookRecipe(
    id: CookBook_RecipeEntity['id']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(
      `${getApiUrl('DeleteCookBookRecipe')}?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        return '';
      });
  }
}

export default CookbookRecipeService;
