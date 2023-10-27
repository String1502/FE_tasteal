import { accounts as accountsSampleData } from "@/types/sampleData";
import { AccountEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { apiPath } from "../constants/common";

/**
 * Represents a service for managing accounts.
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

  /**
   * Get account by id
   *
   * @param id - The id of the account
   */
  public static GetById(id: number) {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(
      accountsSampleData.find((account) => account.id === id)
    );
  }

  public static async GetMostContributedAccounts(
    limit: number
  ): Promise<AccountEntity[]> {
    let accounts: AccountEntity[] = [];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: limit,
        page: 0,
        isDescend: true,
      }),
    };

    await fetch(`${apiPath}/api/v2/Home/authors`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        accounts = data;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });

    return accounts;
  }
}

export default AccountService;
