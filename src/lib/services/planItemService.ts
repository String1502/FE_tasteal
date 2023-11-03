import { planItems as planItemSampleData } from "@/types/sampleData";
import { PlanEntity, PlanItemEntity, RecipeEntity } from "@/types/type";
import simulateDelay from "@/utils/promises/stimulateDelay";
import PlanService from "./planService";
import RecipeService from "./recipeService";

class PlanItemService {
  public static async GetAllPlanItems(): Promise<PlanItemEntity[]> {
    simulateDelay(1);

    const plans: PlanEntity[] = await PlanService.GetAllPlans();
    const recipes: RecipeEntity[] = await RecipeService.GetAllRecipes();

    let planItemss: PlanItemEntity[] = planItemSampleData.map((planItem) => {
      return {
        ...planItem,
        Plan: plans.find((plan) => plan.id === planItem.plan_id),
        Recipe: recipes.find((recipe) => recipe.id === planItem.recipe_id),
      };
    });

    return Promise.resolve(planItemss);
  }

  public static async GetPlanItemsByPlanId(
    planId: number | undefined
  ): Promise<PlanItemEntity[]> {
    if (!planId) {
      return Promise.resolve([]);
    }
    const allPlanItems = await this.GetAllPlanItems();
    return Promise.resolve(
      allPlanItems.filter((planItem) => planItem.plan_id === planId)
    );
  }

  public static async GetPlanItemsByAccountId(
    accountId: number | undefined
  ): Promise<PlanItemEntity[]> {
    if (!accountId) {
      return Promise.resolve([]);
    }
    const planIds = (await PlanService.GetPlansByAccountId(accountId)).map(
      (plan) => plan.id
    );
    if (planIds.length <= 0) {
      return Promise.resolve([]);
    }

    let result: PlanItemEntity[] = [];

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
