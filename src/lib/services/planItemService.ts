import { Plan_ItemEntity } from '../models/entities/Plan_ItemEntity/Plan_ItemEntity';

import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';
import { getApiUrl } from '../constants/api';
import { PlanDeleteReq, PlanReq } from '../models/dtos/Request/PlanReq/PlanReq';

import { RecommendMealPlanReq } from '../models/dtos/Request/RecommendMealPlanReq/RecommendMealPlanReq';
import { RecommendMealPlanRes } from '../models/dtos/Response/RecommendMealPlanRes/RecommendMealPlanRes';

class PlanItemService {
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
      .then((data: Plan_ItemEntity[]) => {
        console.log(data);

        return data.map((item) => {
          return {
            ...item,
            plan: {
              ...item.plan,
              date: new Date(item.plan?.date),
            },
          };
        });
      })
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

  public static async RecommendMealPlan(
    recommendMealPlanReq: RecommendMealPlanReq
  ): Promise<RecommendMealPlanRes> {
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(recommendMealPlanReq),
    };

    return await fetch(`${getApiUrl('RecommendMealPlan')}`, requestOptions)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Lỗi:', error);
        throw error;
      });
  }
}

export default PlanItemService;
