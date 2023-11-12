import { AuthorRes } from "../AuthorRes/AuthorRes";

export type RelatedRecipeRes = {
  id: number;
  name: string;
  image: string;
  totalTime: string;
  rating: number;
  ingredientAmount: number;
  author: AuthorRes;
};
