import { accounts, plans as planSampleData } from "@/types/sampleData";
import { PlanEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";

class PlanService {
  public static GetAllPlans(): Promise<PlanEntity[]> {
    simulateDelay(1);

    let plans: PlanEntity[] = planSampleData.map((plan) => {
      return {
        ...plan,
        Account: accounts.find((account) => account.id === plan.account_id),
      };
    });

    return Promise.resolve(plans);
  }

  public static async GetPlansByAccountId(
    accountId: number | undefined
  ): Promise<PlanEntity[]> {
    const allPlans = await this.GetAllPlans();
    return Promise.resolve(
      allPlans.filter((cart) => cart.account_id === accountId)
    );
  }
}

export default PlanService;
