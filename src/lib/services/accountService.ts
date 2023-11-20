import { accounts as accountsSampleData } from "@/lib/constants/sampleData";
import { createDebugStringFormatter } from "@/utils/debug/formatter";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { getApiUrl } from "../constants/api";
import AccountReq from "../models/dtos/Request/AccountReq/AccountReq";
import { PageFilter } from "../models/dtos/Request/PageFilter/PageFilter";
import { AccountEntity } from "../models/entities/AccountEntity/AccountEntity";
import { AuthorRes } from "../models/dtos/Response/AuthorRes/AuthorRes";

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
  ): Promise<AccountReq[]> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pageSize: limit,
        page: 1,
        isDescend: true,
      } as PageFilter),
    };

    let result: AccountReq[] = [];

    Promise.all([
      fetch(getApiUrl("GET_MOST_CONTRIBUTED_ACCOUNTS"), requestOptions)
        .then((res) => res.json())
        .then((data) => {
          result = data;
        })
        .catch((error) => {
          console.error("Lỗi:", error);
        }),
    ]);

    return Promise.resolve(result);
  }

  /**
   * Create a new account in the database with the UID generated in the Firebase authentication.
   *
   * @param accountReq - Account Request
   */
  public static async SignUpAccount(accountReq: AccountReq): Promise<boolean> {
    try {
      const url = getApiUrl("SIGNUP_USER");
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountReq),
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log(createDebugString("User signup success"));
        return true;
      } else {
        console.log(createDebugString("User signup failed"));
        return false;
      }
    } catch (err) {
      console.log(createDebugString("User signup failed"), err);
      return false;
    }
  }
}

export default AccountService;
