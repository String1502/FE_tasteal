import { accounts as accountsSampleData } from "@/lib/constants/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { API_PATH } from "../constants/common";
import { AccountEntity } from "../models/entities/AccountEntity/AccountEntity";
import { getApiUrl } from "../constants/api";
import { PageFilter } from "../models/dtos/Request/PageFilter/PageFilter";

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
   * @param uid - The id of the account
   */
  public static GetByUid(uid: string) {
    // Simulate delay of 1 second
    simulateDelay(1);

    return Promise.resolve(
      accountsSampleData.find((account) => account.uid === uid)
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
      } as PageFilter),
    };

    fetch(getApiUrl("GET_MOST_CONTRIBUTED_ACCOUNTS"), requestOptions)
      .then((res) => res.json())
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
