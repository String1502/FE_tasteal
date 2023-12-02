/**
 * The base URL of the API.
 */
export const API_BASE_URL = "https://apitasteal.azurewebsites.net/";
export const API_VERSION = "api/v2/";
export const API_PATH = `${API_BASE_URL}${API_VERSION}`;

/**
 * List of API endpoints.
 */
export const API_END_POINT = {
  // Recipe
  CREATE_RECIPE: "Recipe/Add",
  SEARCH_RECIPE: "Recipe/Search",
  GET_RECIPE: "Recipe/GetRecipe",
  // Ingredient
  GET_ALL_INGREDIENTS: "Ingredient/getall",
  // Home
  GET_OCCASION: "Home/getoccasion",
  GET_RECIPE_BY_DATETIME: "Home/recipebydatetime",
  GET_RECIPE_BY_RATING: "Home/recipebyrating",
  GET_MOST_CONTRIBUTED_ACCOUNTS: "Home/authors",
  // Cart
  GET_ALL_CART_BY_ACCOUNT_ID: "Cart/getall",
  DELETE_ALL_CART_BY_ACCOUNT_ID: "Cart/allcart",
  UPDATE_CART: "Cart/servingsize",
  GET_CART_ITEM_BY_CART_ID: "Cart/cartitem",
  DELETE_CART_BY_ID: "Cart/cart",
  // USER
  SIGNUP_USER: "User/signup",
  UPDATEUSER: "/User/updateuser",
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
  return API_PATH + API_END_POINT[endpoint];
}
