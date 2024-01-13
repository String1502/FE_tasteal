import { planItems as planItemSampleData } from '@/lib/constants/sampleData';
import simulateDelay from '@/utils/promises/stimulateDelay';
import { PlanEntity } from '../models/entities/PlanEntity/PlanEntity';
import { Plan_ItemEntity } from '../models/entities/Plan_ItemEntity/Plan_ItemEntity';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';
import PlanService from './planService';
import RecipeService from './recipeService';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { getApiUrl } from '../constants/api';
import { PlanDeleteReq, PlanReq } from '../models/dtos/Request/PlanReq/PlanReq';

class PlanItemService {
  public static async GetAllPlanItems(): Promise<Plan_ItemEntity[]> {
    simulateDelay(1);

    const plans: PlanEntity[] = await PlanService.GetAllPlans();
    const recipes: RecipeEntity[] = await RecipeService.GetAllRecipes();

    const planItemss: Plan_ItemEntity[] = planItemSampleData.map((planItem) => {
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
    accountId: AccountEntity['uid']
  ): Promise<Plan_ItemEntity[]> {
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    return await fetch(
      `${getApiUrl('GetPlanItemsByAccountId')}?accountId=${accountId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async AddOrUpdateRecipesToPlan(
    planReq: PlanReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(planReq),
    };

    return await fetch(
      `${getApiUrl('AddOrUpdateRecipesToPlan')}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }

  public static async DeletePlanItem(
    planDeleteReq: PlanDeleteReq
  ): Promise<boolean> {
    const requestOptions: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(planDeleteReq),
    };

    return await fetch(`${getApiUrl('DeletePlanItem')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }
}

export default PlanItemService;
