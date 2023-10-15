export type AccountEntity = {
  id: number;
  username?: string | null;
  password?: string | null;
};

export type Cart_ItemEntity = {
  id: number;
  account_id?: number | null;
  ingredient_id?: number | null;
  amount: number;
  Account?: AccountEntity | null;
  Ingredient?: IngredientEntity | null;
};

export type CommentEntity = {
  id: number;
  recipe_id: number;
  account_id: number;
  comment?: string | null;
  Recipe?: RecipeEntity | null;
  Account?: AccountEntity | null;
};

export type CookBook_RecipeEntity = {
  id: number;
  cook_book_id: number;
  recipe_id: number;
  CookBook?: CookBookEntity | null;
  Recipe?: RecipeEntity | null;
};

export type CookBookEntity = {
  id: number;
  name: string;
  owner?: number | null;
  Account?: AccountEntity | null;
};

export type Ingredient_TypeEntity = {
  id: number;
  name: string;
  // measurement_unit_id: number;
};

export type IngredientEntity = {
  id: number;
  name: string;
  image?: string | null;
  measurement_unit_id: number;
  type_id: number;
  nutrition_info_id: number;
  isLiquid: boolean;
  ratio: number;
  Ingredient_Type?: Ingredient_TypeEntity | null;
  Nutrition_Info?: Nutrition_InfoEntity | null;
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
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;
};

export type OccasionEntity = {
  id: number;
  name: string;
  description?: string | null;
  image?: string | null;
  start_at: Date;
};

export type Pantry_ItemEntity = {
  id: number;
  account_id?: number | null;
  ingredient_id?: number | null;
  amount: number;
  Account?: AccountEntity | null;
  Ingredient?: IngredientEntity | null;
};

export type PlanEntity = {
  id: number;
  account_id: number;
  recipe_id: number;
  date: Date;
  serving_size: number;
  AccountEntity?: AccountEntity | null;
  RecipeEntity?: RecipeEntity | null;
};

export type RatingEntity = {
  id: number;
  recipe_id: number;
  account_id: number;
  rating: number;
  Account?: AccountEntity | null;
  Recipe?: RecipeEntity | null;
};

export type Recipe_DirectionEntity = {
  id: number;
  recipe_id: number;
  step: number;
  direction?: string | null;
  image?: string | null;
  Recipe?: RecipeEntity | null;
};

export type Recipe_ImageEntity = {
  id: number;
  recipe_id: number;
  image?: string | null;
  Recipe?: RecipeEntity | null;
};

export type Recipe_IngredientEntity = {
  id: number;
  recipe_id: number;
  ingredient_id: number;
  amount: number;
  note?: string | null;
  // is_required: boolean;
  Recipe?: RecipeEntity | null;
  Ingredient?: IngredientEntity | null;
};

export type Recipe_OccasionEntity = {
  id: number;
  occasion_id: number;
  recipe_id: number;
  OccasionEntity?: OccasionEntity | null;
  RecipeEntity?: RecipeEntity | null;
};

export type RecipeEntity = {
  id: number;
  name: string;
  rating: number;
  totalTime: number;
  active_time: number;
  serving_size: number;
  introduction?: string | null;
  author_note?: string | null;
  is_private: boolean;
  image?: string | null;
  author?: number | null;
  nutrition_info_id?: number | null;
  Account?: AccountEntity | null;
  Nutrition_info?: Nutrition_InfoEntity | null;
};

export type RecipeSearchEntity = {
  IngredientID?: number[] | null;
  ExceptIngredientID?: number[] | null;
  TotalTime?: number | null;
  ActiveTime?: number | null;
  OccasionID?: number | null;
  Calories?: number | null;
  TextSearch?: string | null;
};
