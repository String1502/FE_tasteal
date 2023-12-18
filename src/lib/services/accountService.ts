import { createDebugStringFormatter } from '@/utils/debug/formatter';
import { getApiUrl } from '../constants/api';
import AccountReq from '../models/dtos/Request/AccountReq/AccountReq';
import { PageFilter } from '../models/dtos/Request/PageFilter/PageFilter';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';

const createDebugString = createDebugStringFormatter('AccountService');

/**
 * Represents a service for managing accounts.
 */
class AccountService {
  /**
   * Retrieves all occasions.
   *
   * @return {Promise<AccountEntity[]>}
   */
  public static async GetAllUser(
    pageSize: number = 12,
    page: number = 1
  ): Promise<AccountEntity[]> {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      // body: JSON.stringify({
      //     pageSize: pageSize,
      //     page: page,
      // } as PageReq),
    };

    return await fetch(getApiUrl('GetAllUser'), requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });
  }

  /**
   * Get account by id
   *
   * @param uid - The id of the account
   */
  public static GetByUid(uid: string) {
    return fetch(`${getApiUrl('GetUser')}?accountId=${uid}`).then((res) =>
      res.json()
    );
  }

  public static async GetMostContributedAccounts(
    limit: number
  ): Promise<AccountReq[]> {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageSize: limit,
        page: 1,
        isDescend: true,
      } as PageFilter),
    };

    let result: AccountReq[] = [];

    await fetch(getApiUrl('GetMostContributedAccounts'), requestOptions)
      .then((res) => res.json())
      .then((data) => {
        result = data;
        console.log(data);
      })
      .catch((error) => {
        console.error('Lỗi:', error);
      });

    return result;
  }

  /**
   * Create a new account in the database with the UID generated in the Firebase authentication.
   *
   * @param accountReq - Account Request
   */
  public static async SignUpAccount(accountReq: AccountReq): Promise<boolean> {
    try {
      const url = getApiUrl('SignUpUser');
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountReq),
      };

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.log(createDebugString('User signup success'));
        return true;
      } else {
        console.log(createDebugString('User signup failed'));
        return false;
      }
    } catch (err) {
      console.log(createDebugString('User signup failed'), err);
      return false;
    }
  }
}

export default AccountService;
