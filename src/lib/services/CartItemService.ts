import {
  cartItems as cartItemSampleData,
  ingredients as ingredientSampleData,
  ingredientTypes,
} from "@/types/sampleData";
import { Cart_ItemEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import CartService from "./cartService";

class CartItemService {
  public static async GetAllCartItems(): Promise<Cart_ItemEntity[]> {
    simulateDelay(1);

    const carts = await CartService.GetAllCarts();
    const ingredients = ingredientSampleData.map((ingredient) => {
      return {
        ...ingredient,
        Ingredient_Type: ingredientTypes.find(
          (type) => type.id === ingredient.type_id
        ),
      };
    });

    let cartItems: Cart_ItemEntity[] = cartItemSampleData.map((item) => {
      return {
        ...item,
        Cart: carts.find((cart) => cart.id === item.cart_id),
        Ingredient: ingredients.find(
          (ingredient) => ingredient.id === item.ingredient_id
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
      cartItems.filter((item) => cartIds.includes(item.cart_id))
    );
  }
}

export default CartItemService;
