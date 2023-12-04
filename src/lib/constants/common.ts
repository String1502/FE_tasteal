/**
 * Represents the "N/A" value.
 */
export const N_A_VALUE = "N/A";

export const API_PATH = "https://apitasteal.azurewebsites.net";

export const DEFAULT_PAGE = 1;

export const PAGE_ROUTE = {
  HOME: "/",
  SEARCH: "/search",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  SIGN_UP_EMAIL: "/signupemail",
  FORGOT_PASS: "/forgotpass",
  RECIPE: {
    CREATE: "/recipe/create",
    DETAIL: "/recipe/:id",
    EDIT: "/recipe/:id/edit",
  },
  GROCERY: "/grocery",
  MEALPLANNER: "/mealplanner",
  MY_SAVED_RECIPES: "/mysaverecipes",
} as const;
