/**
 * The base URL of the API.
 */
export const API_BASE_URL = "https://apitasteal.azurewebsites.net/";
export const API_VERSION = "api/v2";
export const API_PATH = `${API_BASE_URL}${API_VERSION}`;

/**
 * List of API endpoints.
 */
export const API_END_POINT = {
  // RECIPE
  CREATE_RECIPE: "/Recipe/Add",
  GET_RECIPE: "/Recipe/GetRecipe",
  // INGREDIENT
  GET_ALL_INGREDIENTS: "/Ingredient/getall",
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
