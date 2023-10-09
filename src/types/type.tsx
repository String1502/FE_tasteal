export type RecipeEntity = {
  id: number;
  name: string;
  rating: number;
  totalTime: number; // assume totalTime is represented as a string (e.g., "2 hours")
  active_time: number; // assume active_time is represented as a string (e.g., "30 minutes")
  serving_size: number;
  introduction: string;
  author_note: string;
  is_private: boolean;
  image: string;
  author: number;
  nutrition_info_id: number;
};

export type AccountEntity = {
  id: number;
  username: string;
  password: string;
};

export type RatingEntity = {
  recipe_id: number;
  account_id: number;
  rating: number;
};
