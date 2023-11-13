import { accounts as accountsSampleData } from "@/lib/constants/sampleData";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { getApiUrl } from "../constants/api";
import AccountReq from "../models/dtos/Request/AccountReq/AccountReq";
import { PageFilter } from "../models/dtos/Request/PageFilter/PageFilter";
import { AccountEntity } from "../models/entities/AccountEntity/AccountEntity";

const createDebugString = createDebugStringFormatter("AccountService");

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

  /**
   * Create a new account in database with uid generated in the firebase authentication
   *
   * @param accountReq - Account Request
   */
  public static async SignUpAccount(accountReq: AccountReq): Promise<boolean> {
    const url = getApiUrl("SIGNUP_USER");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountReq),
    };

    return fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log(createDebugString("User signup success"));
          return true;
        } else {
          createDebugString("User signup failed");
          return false;
        }
      })
      .catch((err) => {
        console.log(createDebugString("User signup failed"), err);
        return false;
      });
  }
}

export default AccountService;
