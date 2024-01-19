import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';

export type RecommendMealPlanRes = {
  state: 'smaller' | 'higher' | 'equal';
  recipe_add_ids: {
    id: RecipeEntity['id'];
    amount: number;
  }[];
  recipe_remove_ids: RecipeEntity['id'][];
  standard_calories: number;
  real_calories: number;
};

export function getLabelResult(state: RecommendMealPlanRes['state']) {
  if (state === 'smaller') {
    return 'Bạn cần tăng khẩu phần ăn';
  } else if (state === 'higher') {
    return 'Bạn cần giảm khẩu phần ăn';
  } else if (state === 'equal') {
    return 'Bạn có một chế độ ăn tuyệt vời';
  } else {
    return '';
  }
}
