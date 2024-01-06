import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';

/**
 * Represents the "N/A" value.
 */
export const N_AValue = 'N/A';

export const ApiPath = 'https://apitasteal.azurewebsites.net';

export const DefaultPage = 1;

export const PageRoute = {
  Home: '/',
  Search: '/search',
  SignIn: '/signin',
  SignUp: '/signup',
  SignUpEmail: '/signupemail',
  ForgotPass: '/forgotpass',
  Recipe: {
    Create: '/recipe/create',
    Detail: (id?: RecipeEntity['id']) => (id ? `/recipe/${id}` : '/recipe/:id'),
    Edit: (id?: RecipeEntity['id']) =>
      id ? `/recipe/${id}/edit` : '/recipe/:id/edit',
  },
  Grocery: '/grocery',
  MealPlanner: '/mealplanner',
  MyPantry: '/mypantry',
  MySavedRecipes: '/mysaverecipes',
  Partner: (uid?: AccountEntity['uid']) =>
    uid ? `/partner/${uid}` : '/partner/:uid',
  AllPartner: '/allpartner',
  Admin: {
    Index: '/admin',
    Ingredients: {
      Index: '/admin/ingredients',
      Create: '/admin/ingredients/create',
      View: '/admin/ingredients/:id',
    },
    Occasions: {
      Index: '/admin/occasions',
      Create: '/admin/occasions/create',
      View: '/admin/occasions/:id',
    },
  },
  ReferenceIngredient: (id?: string) =>
    id ? `/reference/ingredients/${id}` : '/reference/:type/:id',
  Reference: (type?: 'ingredients' | 'occasions') =>
    type ? `/reference/${type}` : '/reference/:type',
} as const;
