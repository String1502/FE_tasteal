//#region POST

//#region /api/v2/Recipe/Add

//#region Request

export type Ingredient = {
  name: string;
  amount: number;
  isLiquid: boolean;
};

export type Direction = {
  step: number;
  direction: string;
  image: string;
};

/**
 * Represents a recipe post model.
 * This is used for post request.
 */
export type RecipePostModel = {
  name: string;
  rating: number;
  image: string;
  totalTime: string;
  activeTime: string;
  servingSize: number;
  introduction: string;
  authorNote: string;
  isPrivate: boolean;
  author: string;
  ingredients: Ingredient[];
  directions: Direction[];
};

//#endregion

//#region Response

/**
 * Represents a recipe create response.
 */
export type RecipeCreateResponse = {
  id: number;
  name: string;
  rating: number;
  totalTime: {
    ticks: number;
    days: number;
    hours: number;
    milliseconds: number;
    microseconds: number;
    nanoseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMicroseconds: number;
    totalNanoseconds: number;
    totalMinutes: number;
    totalSeconds: number;
  };
  active_time: {
    ticks: number;
    days: number;
    hours: number;
    milliseconds: number;
    microseconds: number;
    nanoseconds: number;
    minutes: number;
    seconds: number;
    totalDays: number;
    totalHours: number;
    totalMilliseconds: number;
    totalMicroseconds: number;
    totalNanoseconds: number;
    totalMinutes: number;
    totalSeconds: number;
  };
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  image: string;
  author: string;
  nutrition_info_id: number;
  createdAt: string;
  updatedAt: string;
  account: {
    uid: string;
    name: string;
    avatar: string;
    introduction: string;
  };
  nutrition_info: {
    id: number;
    calories: number;
    fat: number;
    saturated_fat: number;
    trans_fat: number;
    cholesterol: number;
    carbohydrates: number;
    fiber: number;
    sugars: number;
    protein: number;
    sodium: number;
    vitaminD: number;
    calcium: number;
    iron: number;
    potassium: number;
  };
  ingredients: {
    id: number;
    name: string;
    image: string;
    nutrition_info_id: number;
    type_id: number;
    isLiquid: boolean;
    ratio: number;
    amount: number;
    note: string;
    ingredient_type: {
      id: number;
      name: string;
    };
    nutrition_info: {
      id: number;
      calories: number;
      fat: number;
      saturated_fat: number;
      trans_fat: number;
      cholesterol: number;
      carbohydrates: number;
      fiber: number;
      sugars: number;
      protein: number;
      sodium: number;
      vitaminD: number;
      calcium: number;
      iron: number;
      potassium: number;
    };
  }[];
  direction: {
    recipe_id: number;
    step: number;
    direction: string;
    image: string;
    recipeEntity: string;
  }[];
};

//#endregion

//#endregion

//#endregion
