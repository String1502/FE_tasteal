import { recipes as recipesSampleData } from "@/types/sampleData";
import { RecipeEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

/**
 * Represents a service for managing occasions.
 */
class RecipeService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<RecipeEntity[]>}
   */
  public static GetAllRecipes(): Promise<RecipeEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the occasions array

    return Promise.resolve(recipesSampleData);
  }

  public static GetById(id: number): Promise<RecipeEntity | undefined> {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(
      recipesSampleData.find((recipe) => recipe.id === id)
    );
  }

  /**
   * Fetch recipes that belong to a specific account.
   *
   * @param accountId - The id of the account.
   * @returns
   */
  public static GetByAccountId(accountId: number) {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(
      recipesSampleData.filter((recipe) => recipe.author === accountId)
    );
  }

  public static async GetNewReleaseRecipes(
    limit: number
  ): Promise<RecipeEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);
    const recipes = await RecipeService.GetAllRecipes();
    return recipes
      .sort(
        (a, b) =>
          new Date(b.created_at ?? "").getTime() -
          new Date(a.created_at ?? "").getTime()
      )
      .slice(0, limit);
  }

  public static async GetTrendingRecipes(
    limit: number
  ): Promise<RecipeEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);
    const recipes = await RecipeService.GetAllRecipes();
    return recipes.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }
}

export default RecipeService;
