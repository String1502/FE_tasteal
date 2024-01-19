import simulateDelay from '@/utils/promises/stimulateDelay';
import {
  accounts,
  cookbooks as cookbookSampleData,
} from '../constants/sampleData';
import { CookBookEntity } from '../models/entities/CookBookEntity/CookBookEntity';
import { getApiUrl } from '../constants/api';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { NewCookBookReq } from '../models/dtos/Request/NewCookBookReq/NewCookBookReq';
import { NewCookBookNameReq } from '../models/dtos/Request/NewCookBookNameReq/NewCookBookNameReq';
class CookbookService {
  public static GetAllCookbooks(): Promise<CookBookEntity[]> {
    simulateDelay(1);

    let cookbooks: CookBookEntity[] = cookbookSampleData.map((book) => {
      return {
        ...book,
        account: accounts.find((account) => account.uid === book.owner),
      };
    });

    return Promise.resolve(cookbooks);
  }

  public static async GetAllCookBookByAccountId(
    uid: AccountEntity['uid']
  ): Promise<CookBookEntity[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl('GetAllCookBookByAccountId')}?uid=${uid}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        return [];
      });
  }

  public static async DeleteCookBookById(
    id: CookBookEntity['id']
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    return await fetch(
      `${getApiUrl('DeleteCookBookById')}?id=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async AddCookBook(
    newCookBook: NewCookBookReq
  ): Promise<CookBookEntity> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newCookBook),
    };
    return await fetch(`${getApiUrl('AddCookBook')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async UpdateCookBookName(
    updateInfor: NewCookBookNameReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(updateInfor),
    };
    return await fetch(`${getApiUrl('UpdateCookBookName')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Länge:', error);
        throw error;
      });
  }
}

export default CookbookService;
