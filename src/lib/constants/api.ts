/**
 * The base URL of the API.
 */
export const API_BASE_URL = "https://apitasteal.azurewebsites.net/";

/**
 * List of API endpoints.
 */
export const API_END_POINT = {
  // Recipe
  CREATE_RECIPE: "/api/v2/Recipe/Add",
  SEARCH_RECIPE: "/api/v2/Recipe/Search",
  GET_RECIPE: "/api/v2/Recipe/GetRecipe",
  // Ingredient
  GET_ALL_INGREDIENTS: "/api/v2/Ingredient/getall",
  // Home
  GET_OCCASION: "/api/v2/Home/getoccasion",
  GET_RECIPE_BY_DATETIME: "/api/v2/Home/recipebydatetime",
  GET_RECIPE_BY_RATING: "/api/v2/Home/recipebyrating",
  GET_MOST_CONTRIBUTED_ACCOUNTS: "/api/v2/Home/authors",
  // Cart
  GET_ALL_CART_BY_ACCOUNT_ID: "/api/v2/Cart/getall",
  DELETE_ALL_CART_BY_ACCOUNT_ID: "/api/v2/Cart/allcart",
  UPDATE_CART: "/api/v2/Cart/servingsize",
  GET_CART_ITEM_BY_CART_ID: "/api/v2/Cart/cartitem",
  DELETE_CART_BY_ID: "/api/v2/Cart/cart",
} as const;

/**
 * Represents an API endpoint.
 */
export type ApiEndPoint = keyof typeof API_END_POINT;

/**
 * Get the correct api url.
 *
 * @param endpoint - Api endpoint
 * @returns Full url path
 */
export function getApiUrl(endpoint: ApiEndPoint) {
  return API_BASE_URL + API_END_POINT[endpoint];
}
