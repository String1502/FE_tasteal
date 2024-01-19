/**
 * The base URL of the API.
 */
export const ApiBaseUrl = 'https://apitasteal.azurewebsites.net/';
export const ApiVersion = 'api/v2/';
export const ApiPath = `${ApiBaseUrl}${ApiVersion}`;

/**
 * List of API endpoints.
 */
export const ApiEndPoint = {
  //
  // Cart
  GetAllCartByAccountId: 'Cart/allcart',
  DeleteAllCartByAccountId: 'Cart/allcart',
  UpdateCart: 'Cart/servingsize',
  GetCartItemByCartId: 'Cart/cartitem',
  DeleteCartById: 'Cart/cart',
  UpdateCartItem: 'Cart/cartitemstatus',
  GetPersonalCartsByUserId: 'Cart/personalcarts',
  AddPersonalCart: 'Cart/personalcart',
  UpdatePersonalCart: 'Cart/personalcart',
  //
  // Cart Item
  AddRecipeToCart: 'CartItem/add-recipe-cart',
  //
  // COMMENT
  CreateComment: (recipeId: string) => `Recipe/${recipeId}/Comments`,
  GetComments: (recipeId: string) => `Recipe/${recipeId}/Comments`,
  UpdateComment: (recipeId: string, commentId: string) =>
    `Recipe/${recipeId}/Comments/${commentId}`,
  DeleteComment: (recipeId: string, commentId: string) =>
    `Recipe/${recipeId}/Comments/${commentId}`,
  //
  // CookBook
  GetAllCookBookByAccountId: 'CookBook/cookbook',
  DeleteCookBookById: 'CookBook/cookbook',
  AddCookBook: 'CookBook/cookbook',
  GetCookBookRecipeByCookBookId: 'CookBook/cookbook-recipe',
  DeleteCookBookRecipe: 'CookBook/cookbook-recipe',
  MoveRecipeToNewCookbook: 'CookBook/recipetonewcookbook',
  UpdateCookBookName: 'CookBook/namecookbook',
  AddRecipeToCookBook: 'CookBook/recipetocookbook',
  //
  // Home
  GetOccasion: 'Home/getoccasion',
  GetRecipeByDateTime: 'Home/recipebydatetime',
  GetRecipeByRating: 'Home/recipebyrating',
  GetMostContributedAccounts: 'Home/authors',
  //
  // Ingredient
  GetAllIngredients: 'Ingredient/getall',
  GetIngredientById: 'Ingredient',
  AddIngredient: 'Ingredient',
  DeleteIngredient: 'Ingredient',
  UpdateIngredient: 'Ingredient',
  //
  // Ingredient Type
  GetAllIngredientTypes: 'IngredientType/getall',
  GetIngredientTypeById: 'IngredientType',
  DeleteIngredientType: 'IngredientType',
  AddIngredientType: 'IngredientType/create',
  UpdateIngredientType: 'IngredientType/update',
  //
  // Occasion
  GetAllOccasions: 'Occasion/getAll',
  GetOccasionById: 'Occasion',
  AddOccasion: 'Occasion',
  UpdateOccasion: 'Occasion',
  DeleteOccasion: 'Occasion',
  //
  // Pantry
  GetRecipesByIngredientsAny: 'Pantry/getRecipesByIngredientsAny',
  GetRecipesByIngredientsAll: 'Pantry/getRecipesByIngredientsAll',
  GetRecipesByPantryIdAny: 'Pantry/getRecipesByPantryIdAny',
  GetRecipesByPantryIdAll: 'Pantry/getRecipesByPantryIdAll',
  //
  // Pantry Item
  GetAllPantryItemsByAccountId: 'PantryItem/all_pantry_item',
  GetPantryItemById: 'PantryItem/pantry_item',
  AddPantryItem: 'PantryItem/pantry_item',
  UpdatePantryItem: 'PantryItem/pantry_item',
  DeletePantryItem: 'PantryItem/pantry_item',
  //
  // Plan/ Plan Item -> PlanItemService
  GetPlanItemsByAccountId: 'Plan',
  AddOrUpdateRecipesToPlan: 'Plan/addorupdate',
  DeletePlanItem: 'Plan',
  //
  // RATING
  CreateRating: (recipeId: string) => `Recipe/${recipeId}/Rating`,
  GetRatings: (recipeId: string) => `Recipe/${recipeId}/Rating`,
  UpdateRating: (recipeId: string, ratingId: string) =>
    `Recipe/${recipeId}/Rating/${ratingId}`,
  //
  // Recipe
  CreateRecipe: 'Recipe/Add',
  UpdateRecipe: (recipeId: string) => `Recipe/${recipeId}`,
  SearchRecipe: 'Recipe/Search',
  GetAllRecipe: 'Recipe/getall',
  GetRecipeById: 'Recipe/GetRecipeById',
  GetRecipesByIds: 'Recipe/GetRecipesById',
  GetRecipesByUserId: 'Recipe/GetRecipesByUserId',
  GetKeyWords: 'Recipe/keywords',
  DeleteRecipe: 'Recipe/recipe',

  //
  // USER
  SignUpUser: 'User/signup',
  UpdateUser: 'User/updateuser',
  GetAllUser: 'User/allusers',
  GetUserByUid: 'User',
  GetCurrentUser: 'User',
} as const;

/**
 * Represents an API endpoint.
 */
export type ApiEndPoint = keyof typeof ApiEndPoint;

/**
 * Get the correct api url.
 *
 * @param endpoint - Api endpoint
 * @returns Full url path
 */
export function getApiUrl(endpoint: ApiEndPoint, id?: string, id2?: string) {
  const apiEndPoint = ApiEndPoint[endpoint];
  if (typeof apiEndPoint === 'string') {
    return ApiPath + apiEndPoint;
  }
  if (typeof apiEndPoint === 'function') {
    return ApiPath + apiEndPoint(id, id2);
  }
  throw new Error("Can't get api url");
}
