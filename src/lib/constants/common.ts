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
  Partner: (name?: AccountEntity['name']) =>
    name ? `/partner/${name}` : '/partner/:name',
  AllPartner: '/allpartner',
  Admin: '/admin',
} as const;
