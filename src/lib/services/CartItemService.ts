import {
  cartItems as cartItemSampleData,
  ingredients as ingredientSampleData,
  ingredientTypes,
} from '@/lib/constants/sampleData';
import simulateDelay from '@/utils/promises/stimulateDelay';
import CartService from './cartService';
import { Cart_ItemEntity } from '../models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { getApiUrl } from '../constants/api';
import { CartEntity } from '../models/entities/CartEntity/CartEntity';
import { IngredientEntity } from '../models/entities/IngredientEntity/IngredientEntity';
import { RecipeToCartReq } from '../models/dtos/Request/RecipeToCartReq/RecipeToCartReq';

class CartItemService {
  public static async GetAllCartItems(): Promise<Cart_ItemEntity[]> {
    simulateDelay(1);

    const carts = await CartService.GetAllCarts();
    const ingredients = ingredientSampleData.map((ingredient) => {
      return {
        ...ingredient,
        ingredient_type: ingredientTypes.find(
          (type) => type.id === ingredient.type_id
        ),
      };
    });

    const cartItems: Cart_ItemEntity[] = cartItemSampleData.map((item) => {
      return {
        ...item,
        cart: carts.find((cart) => cart.id === item.cartId),
        ingredient: ingredients.find(
          (ingredient) => ingredient.id === item.ingredientId
        ),
      };
    });

    return Promise.resolve(cartItems);
  }

  public static async GetCartItemsByCartIds(
    cartIds: CartEntity['id'][]
  ): Promise<Cart_ItemEntity[]> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify([...cartIds]),
    };

    return await fetch(`${getApiUrl('GetCartItemByCartId')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async UpdateCartItem(
    cartID: CartEntity['id'],
    ingredientId: IngredientEntity['id'],
    isBought: Cart_ItemEntity['isBought']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl(
        'UpdateCartItem'
      )}?cartID=${cartID}&ingredientId=${ingredientId}&isBought=${isBought}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async AddRecipeToCart(
    recipeToCartReq: RecipeToCartReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recipeToCartReq),
    };

    return await fetch(`${getApiUrl('AddRecipeToCart')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }
}

export default CartItemService;
