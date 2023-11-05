//#region POST

//#region /api/v2/Recipe/Add

//#region Request

export type IngredientPostModel = {
  id: number;
  amount: number;
};

export type DirectionPostmModel = {
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
  total_time: string;
  active_time: string;
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  author: string;
  ingredients: IngredientPostModel[];
  directions: DirectionPostmModel[];
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
  total_time: Date;
  active_time: Date;
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  image: string;
  author: string;
  nutrition_info_id: number;
  created_at: string;
  updated_at: string;
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
    is_liquid: boolean;
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
