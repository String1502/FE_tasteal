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
    // Recipe
    CreateRecipe: 'Recipe/Add',
    SearchRecipe: 'Recipe/Search',
    GetRecipe: 'Recipe/GetRecipe',
    // Ingredient
    GetAllIngredients: 'Ingredient/getall',
    // Home
    GetOccasion: 'Home/getoccasion',
    GetRecipeByDateTime: 'Home/recipebydatetime',
    GetRecipeByRating: 'Home/recipebyrating',
    GetMostContributedAccounts: 'Home/authors',
    // Cart
    GetAllCartByAccountId: 'Cart/getall',
    DeleteAllCartByAccountId: 'Cart/allcart',
    UpdateCart: 'Cart/servingsize',
    GetCartItemByCartId: 'Cart/cartitem',
    DeleteCartById: 'Cart/cart',
    UpdateCartItem: 'Cart/cartitemstatus',
    // USER
    SignUpUser: 'User/signup',
    UpdateUser: 'User/updateuser',
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
