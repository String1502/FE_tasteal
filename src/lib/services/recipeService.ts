import { getApiUrl } from "@/lib/constants/api";
import { recipes as recipesSampleData } from "@/lib/constants/sampleData";
import { RecipeReq } from "@/lib/models/dtos/Request/RecipeReq/RecipeReq";
import { RecipeRes } from "@/lib/models/dtos/Response/RecipeRes/RecipeRes";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { API_PATH, DEFAULT_PAGE } from "../constants/common";
import { RecipeSearchReq } from "../models/dtos/Request/RecipeSearchReq/RecipeSearchReq";

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
    return Promise.resolve(recipesSampleData);
  }

  /**
   * Get recipe detail data by id.
   * NOTE: This method is not implemented yet.
   *
   * @param id - The id of the recipe.
   * @returns - The recipe detail data.
   */
  public static GetById(id: number): Promise<RecipeRes> {
    return fetch(`${getApiUrl("GET_RECIPE")}?id=${id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((err) => {
        throw err;
      });
  }

  /**
   * Fetch recipes that belong to a specific account.
   *
   * @param accountId - The id of the account.
   * @returns
   */
  public static GetByAccountId(accountId: string) {
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

    console.log(recipes);

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

  public static async SearchRecipes(
    filter: RecipeSearchReq
  ): Promise<RecipeEntity[]> {
    let recipes: RecipeEntity[] = [];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...filter,
      }),
    };

    await fetch(getApiUrl("SEARCH_RECIPE"), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        recipes = data;
        console.log(data);
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
  public static async CreateRecipe(postData: RecipeReq) {
    fetch(getApiUrl("CREATE_RECIPE"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject();
      })
      .then((data: RecipeReq) => {
        console.log("[RecipeService.CreateRecipe] POST succeeded!", data);
        return data;
      })
      .catch((e) => {
        const msg = "POST fail!";
        console.error(`[RecipeService.CreateRecipe] ${msg}`, e);
        throw new Error(msg);
      });
  }

  //#endregion
}

export default RecipeService;
