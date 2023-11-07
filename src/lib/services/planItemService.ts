import { planItems as planItemSampleData } from "@/lib/constants/sampleData";
import simulateDelay from "@/utils/promises/stimulateDelay";
import PlanService from "./planService";
import RecipeService from "./recipeService";
import { PlanEntity } from "../models/entities/PlanEntity/PlanEntity";
import { Plan_ItemEntity } from "../models/entities/Plan_ItemEntity/Plan_ItemEntity";
import { RecipeEntity } from "../models/entities/RecipeEntity/RecipeEntity";

class PlanItemService {
  public static async GetAllPlanItems(): Promise<Plan_ItemEntity[]> {
    simulateDelay(1);

    const plans: PlanEntity[] = await PlanService.GetAllPlans();
    const recipes: RecipeEntity[] = await RecipeService.GetAllRecipes();

    let planItemss: Plan_ItemEntity[] = planItemSampleData.map((planItem) => {
      return {
        ...planItem,
        plan: plans.find((plan) => plan.id === planItem.planId),
        recipe: recipes.find((recipe) => recipe.id === planItem.recipeId),
      };
    });

    return Promise.resolve(planItemss);
  }

  public static async GetPlanItemsByPlanId(
    planId: number | undefined
  ): Promise<Plan_ItemEntity[]> {
    if (!planId) {
      return Promise.resolve([]);
    }
    const allPlanItems = await this.GetAllPlanItems();
    return Promise.resolve(
      allPlanItems.filter((planItem) => planItem.planId === planId)
    );
  }

  public static async GetPlanItemsByAccountId(
    accountId: string | undefined
  ): Promise<Plan_ItemEntity[]> {
    if (!accountId) {
      return Promise.resolve([]);
    }
    const planIds = (await PlanService.GetPlansByAccountId(accountId)).map(
      (plan) => plan.id
    );
    if (planIds.length <= 0) {
      return Promise.resolve([]);
    }

    let result: Plan_ItemEntity[] = [];

    await Promise.all(
      planIds.map(async (planId) => {
        const planItems = await this.GetPlanItemsByPlanId(planId);
        result = result.concat(planItems);
      })
    );
    return Promise.resolve(result);
  }
}

export default PlanItemService;
