import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';

/**
 * Represents the "N/A" value.
 */
export const N_A_VALUE = 'N/A';

export const API_PATH = 'https://apitasteal.azurewebsites.net';

export const DEFAULT_PAGE = 1;

export const PAGE_ROUTE = {
    HOME: '/',
    SEARCH: '/search',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    SIGN_UP_EMAIL: '/signupemail',
    FORGOT_PASS: '/forgotpass',
    RECIPE: {
        CREATE: '/recipe/create',
        DETAIL: (id?: RecipeEntity['id']) =>
            id ? `/recipe/${id}` : '/recipe/:id',
        EDIT: (id?: RecipeEntity['id']) =>
            id ? `/recipe/${id}/edit` : '/recipe/:id/edit',
    },
    GROCERY: '/grocery',
    MEALPLANNER: '/mealplanner',
    MY_SAVED_RECIPES: '/mysaverecipes',
} as const;
