import { AuthorRes } from "../AuthorRes/AuthorRes";
import { CommentRes } from "../CommentRes/CommentRes";
import { DirectionRes } from "../DirectionRes/DirectionRes";
import { IngredientRes } from "../IngredientRes/IngredientRes";
import { Nutrition_InfoEntity } from "../../../entities/Nutrition_InfoEntity/Nutrition_InfoEntity";
import { RelatedRecipeRes } from "../RelatedRecipeRes/RelatedRecipeRes";

export type RecipeRes = {
  name?: string;
  rating: number;
  totalTime: string;
  serving_size: number;
  introduction?: string;
  author_note?: string;
  image?: string;
  author: AuthorRes;
  ingredients?: IngredientRes[];
  nutrition_info?: Nutrition_InfoEntity;
  directions: DirectionRes[];
  comments?: CommentRes[];
  createAt?: Date;
  relatedRecipes?: RelatedRecipeRes[];
};
