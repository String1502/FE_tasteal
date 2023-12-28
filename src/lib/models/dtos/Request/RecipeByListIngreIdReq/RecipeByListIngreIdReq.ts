import { PageReq } from "../../Request/PageReq/PageReq";

export type RecipeByListIngreIdReq = {
  ListIngredientId: number[];
  page: PageReq;
};
