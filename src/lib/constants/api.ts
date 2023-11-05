/**
 * The base URL of the API.
 */
export const API_BASE_URL = "https://apitasteal.azurewebsites.net/";

/**
 * List of API endpoints.
 */
export const API_END_POINT = {
  CREATE_RECIPE: "/api/v2/Recipe/Add",
  GET_ALL_INGREDIENTS: "/api/v2/Ingredient/getall",
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
