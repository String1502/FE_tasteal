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
  //
  // Recipe
  CreateRecipe: 'Recipe/Add',
  SearchRecipe: 'Recipe/Search',
  GetAllRecipe: 'Recipe/getall',
  GetRecipeById: 'Recipe/GetRecipeById',
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
export function getApiUrl(endpoint: ApiEndPoint) {
  return ApiPath + ApiEndPoint[endpoint];
}
