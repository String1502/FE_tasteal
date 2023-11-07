import {
  accounts,
  carts as cartSampleData,
  recipes,
} from "@/lib/constants/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { CartEntity } from "../models/entities/CartEntity/CartEntity";

class CartService {
  public static GetAllCarts(): Promise<CartEntity[]> {
    simulateDelay(1);

    let carts: CartEntity[] = cartSampleData.map((cart) => {
      return {
        ...cart,
        account: accounts.find((account) => account.uid === cart.accountId),
        recipe: recipes.find((recipe) => recipe.id === cart.recipeId),
      };
    });

    return Promise.resolve(carts);
  }

  public static async GetCartByAccountId(
    accountId: string | undefined
  ): Promise<CartEntity[]> {
    const allCarts = await this.GetAllCarts();
    return Promise.resolve(
      allCarts.filter((cart) => cart.accountId === accountId)
    );
  }
}

export default CartService;
