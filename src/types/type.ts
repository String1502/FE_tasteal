export type AccountEntity = {
  id: number;
  username?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
  avatar?: string | undefined;
  introduction?: string | undefined;
};

export type CartEntity = {
  id: number;
  account_id?: number | undefined;
  recipe_id?: number | undefined;
  serving_size: number;
  Account?: AccountEntity | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type Cart_ItemEntity = {
  id: number;
  cart_id: number;
  ingredient_id: number;
  amount: number;
  isBought: boolean;
  Cart?: CartEntity | undefined;
  Ingredient?: IngredientEntity | undefined;
};

export type CommentEntity = {
  id: number;
  recipe_id: number;
  account_id: number;
  comment?: string | undefined;
  Recipe?: RecipeEntity | undefined;
  Account?: AccountEntity | undefined;
};

export type CookBook_RecipeEntity = {
  id: number;
  cook_book_id: number;
  recipe_id: number;
  CookBook?: CookBookEntity | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type CookBookEntity = {
  id: number;
  name: string;
  owner?: number | undefined;
  Account?: AccountEntity | undefined;
};

export type Ingredient_TypeEntity = {
  id: number;
  name: string;
};

export type IngredientEntity = {
  id: number;
  name: string;
  image?: string | undefined;
  measurement_unit_id: number;
  type_id: number;
  nutrition_info_id: number;
  isLiquid: boolean;
  ratio: number;
  Ingredient_Type?: Ingredient_TypeEntity | undefined;
  Nutrition_Info?: Nutrition_InfoEntity | undefined;
};

export type Nutrition_InfoEntity = {
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
  vitamin_d: number;
  calcium: number;
  iron: number;
  potassium: number;
};

export type OccasionEntity = {
  id: number;
  name: string;
  description?: string | undefined;
  image?: string | undefined;
  start_at: Date;
};

export type Pantry_ItemEntity = {
  id: number;
  account_id?: number | undefined;
  ingredient_id?: number | undefined;
  amount: number;
  Account?: AccountEntity | undefined;
  Ingredient?: IngredientEntity | undefined;
};

export type PlanEntity = {
  id: number;
  account_id: number;
  date: Date;
  AccountEntity?: AccountEntity | undefined;
};

export type PlanItemEntity = {
  id: number;
  plan_id: number;
  recipe_id: number;
  serving_size: number;
  order: number;
  Plan?: PlanEntity | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type RatingEntity = {
  id: number;
  recipe_id: number;
  account_id: number;
  rating: number;
  Account?: AccountEntity | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type Recipe_DirectionEntity = {
  id: number;
  recipe_id: number;
  step: number;
  direction?: string | undefined;
  image?: string | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type Recipe_ImageEntity = {
  id: number;
  recipe_id: number;
  image?: string | undefined;
  Recipe?: RecipeEntity | undefined;
};

export type Recipe_IngredientEntity = {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  note?: string | undefined;
  // is_required: boolean;
  Recipe?: RecipeEntity | undefined;
  Ingredient?: IngredientEntity | undefined;
};

export type Recipe_OccasionEntity = {
  id: number;
  occasion_id: number;
  recipe_id: number;
  OccasionEntity?: OccasionEntity | undefined;
  RecipeEntity?: RecipeEntity | undefined;
};

export type RecipeEntity = {
  id: number;
  name: string;
  rating: number;
  totalTime: string;
  active_time: number;
  serving_size: number;
  introduction?: string | undefined;
  author_note?: string | undefined;
  is_private: boolean;
  image?: string | undefined;
  author?: number | undefined;
  nutrition_info_id?: number | undefined;
  Account?: AccountEntity | undefined;
  Nutrition_info?: Nutrition_InfoEntity | undefined;
  created_at?: Date | undefined;
};

export type RecipeSearchEntity = {
  IngredientID?: number[] | undefined;
  ExceptIngredientID?: number[] | undefined;
  TotalTime?: number | undefined;
  ActiveTime?: number | undefined;
  OccasionID?: number | undefined;
  Calories?: number | undefined;
  TextSearch?: string | undefined;
};
