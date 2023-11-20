import simulateDelay from "@/utils/promises/stimulateDelay";
import {
  accounts,
  cookbooks as cookbookSampleData,
} from "../constants/sampleData";
import { CookBookEntity } from "../models/entities/CookBookEntity/CookBookEntity";
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

  public static async GetCookbooksByAccountId(
    accountId: string | undefined
  ): Promise<CookBookEntity[]> {
    const cookbooks = await this.GetAllCookbooks();
    return Promise.resolve(
      cookbooks.filter((book) => book.owner === accountId)
    );
  }
}

export default CookbookService;
