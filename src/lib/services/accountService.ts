import { accounts as accountsSampleData } from "@/types/sampleData";
import { AccountEntity, RecipeEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import RecipeService from "./recipeService";

/**
 * Represents a service for managing occasions.
 */
class AccountService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<AccountEntity[]>}
   */
  public static GetAllAccounts(): Promise<AccountEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);

    // Return a promise that resolves with the occasions array
    return Promise.resolve(accountsSampleData);
  }

  public static async GetMostContributedAccounts(
    limit: number
  ): Promise<AccountEntity[]> {
    // Simulate delay of 1 second
    simulateDelay(1);
    var accounts = await AccountService.GetAllAccounts();

    type AccountWithRecipes = AccountEntity & {
      recipes?: RecipeEntity[];
    };
    var accountsWithRecipes: AccountWithRecipes[] = [];

    accounts.forEach((item) => {
      accountsWithRecipes.push({
        ...item,
        recipes: [],
      });
    });
    var recipes = await RecipeService.GetAllRecipes();
    recipes.forEach((item) => {
      const account = accountsWithRecipes.find(
        (account) => account.id === item.author
      );
      if (account) {
        account.recipes!.push(item);
      }
    });

    accountsWithRecipes = accountsWithRecipes
      .sort((a, b) => b.recipes?.length! - a.recipes?.length!)
      .slice(0, limit);

    return accountsWithRecipes.map((item) => {
      delete item.recipes;
      return item as AccountEntity;
    });
  }
}

export default AccountService;
