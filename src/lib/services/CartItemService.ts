import {
  cartItems as cartItemSampleData,
  ingredients as ingredientSampleData,
  ingredientTypes,
} from "@/lib/constants/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";
import CartService from "./cartService";
import { Cart_ItemEntity } from "../models/entities/Cart_ItemEntity/Cart_ItemEntity";

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

    let cartItems: Cart_ItemEntity[] = cartItemSampleData.map((item) => {
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
    cartIds: number[]
  ): Promise<Cart_ItemEntity[]> {
    const cartItems = await this.GetAllCartItems();
    return Promise.resolve(
      cartItems.filter((item) => cartIds.includes(item.cartId))
    );
  }
}

export default CartItemService;
