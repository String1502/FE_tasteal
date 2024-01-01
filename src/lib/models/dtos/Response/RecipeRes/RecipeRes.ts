import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Nutrition_InfoEntity } from '../../../entities/Nutrition_InfoEntity/Nutrition_InfoEntity';
import { AuthorRes } from '../AuthorRes/AuthorRes';
import { CommentRes } from '../CommentRes/CommentRes';
import { DirectionRes } from '../DirectionRes/DirectionRes';
import { IngredientRes } from '../IngredientRes/IngredientRes';
import { RelatedRecipeRes } from '../RelatedRecipeRes/RelatedRecipeRes';

export type RecipeRes = {
  id: RecipeEntity['id'];
  name?: RecipeEntity['name'];
  rating?: RecipeEntity['rating'];
  totalTime?: RecipeEntity['totalTime'];
  serving_size: RecipeEntity['serving_size'];
  introduction?: RecipeEntity['introduction'];
  author_note?: RecipeEntity['author_note'];
  image?: RecipeEntity['image'];
  author: AuthorRes;
  ingredients?: IngredientRes[];
  nutrition_info?: Nutrition_InfoEntity;
  directions: DirectionRes[];
  comments?: CommentRes[];
  createAt?: Date;
  relatedRecipes?: RelatedRecipeRes[];
};
