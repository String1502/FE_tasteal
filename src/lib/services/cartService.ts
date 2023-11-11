import { accounts, carts as cartSampleData, recipes } from "@/types/sampleData";
import { CartEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

class CartService {
  public static GetAllCarts(): Promise<CartEntity[]> {
    simulateDelay(1);

    const carts: CartEntity[] = cartSampleData.map((cart) => {
      return {
        ...cart,
        Account: accounts.find((account) => account.id === cart.account_id),
        Recipe: recipes.find((recipe) => recipe.id === cart.recipe_id),
      };
    });

    return Promise.resolve(carts);
  }

  public static async GetCartByAccountId(
    accountId: number | undefined
  ): Promise<CartEntity[]> {
    const allCarts = await this.GetAllCarts();
    return Promise.resolve(
      allCarts.filter((cart) => cart.account_id === accountId)
    );
  }
}

export default CartService;
