import { recipes as recipesSampleData } from "@/types/sampleData";
import { RecipeEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { getApiUrl } from "../constants/api";
import { API_PATH, DEFAULT_PAGE } from "../constants/common";
import { RecipePostModel } from "../models/dtos/reicpeDTO";

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
    let recipes: RecipeEntity[] = [];

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        pageSize: limit,
        page: DEFAULT_PAGE,
        isDescend: true,
      }),
    };

    await fetch(`${API_PATH}/api/v2/Home/recipebydatetime`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        recipes = data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });

    return recipes;
  }

  public static async GetTrendingRecipes(
    limit: number
  ): Promise<RecipeEntity[]> {
    let recipes: RecipeEntity[] = [];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        pageSize: limit,
        page: DEFAULT_PAGE,
        isDescend: true,
      }),
    };

    await fetch(`${API_PATH}/api/v2/Home/recipebyrating`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        recipes = data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });

    return recipes;
  }

  //#region POST

  /**
   * Create a new recipe
   */
  public static async CreateRecipe(postData: RecipePostModel): Promise<void> {
    fetch(getApiUrl("CREATE_RECIPE"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response: unknown) => {
        console.log("[RecipeService.CreateRecipe] POST succeeded!", response);
      })
      .catch((e) =>
        console.error("[RecipeService.CreateRecipe] POST failed!", e)
      );
  }

  //#endregion
}

export default RecipeService;
