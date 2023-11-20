import simulateDelay from "@/utils/promises/stimulateDelay";
import { CookBook_RecipeEntity } from "../models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity";
import {
  cookbookRecipes as cookbookRecipeSampleData,
  cookbooks,
  recipes,
} from "../constants/sampleData";
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

  public static async GetCookbookRecipesByCookbookId(
    cookbookId: number | undefined
  ): Promise<CookBook_RecipeEntity[]> {
    if (cookbookId == undefined) {
      return Promise.resolve([]);
    }
    const cookbookRecipes = await this.GetAllCookbookRecipes();
    return Promise.resolve(
      cookbookRecipes.filter((book) => book.cook_book_id === cookbookId)
    );
  }
}

export default CookbookRecipeService;
