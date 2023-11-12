import { accounts, plans as planSampleData } from "@/lib/constants/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";
import { PlanEntity } from "../models/entities/PlanEntity/PlanEntity";

class PlanService {
  public static GetAllPlans(): Promise<PlanEntity[]> {
    simulateDelay(1);

    let plans: PlanEntity[] = planSampleData.map((plan) => {
      return {
        ...plan,
        AccountEntity: accounts.find(
          (account) => account.uid === plan.account_id
        ),
      };
    });

    return Promise.resolve(plans);
  }

  public static async GetPlansByAccountId(
    accountId: string | undefined
  ): Promise<PlanEntity[]> {
    const allPlans = await this.GetAllPlans();
    return Promise.resolve(
      allPlans.filter((cart) => cart.account_id === accountId)
    );
  }
}

export default PlanService;
