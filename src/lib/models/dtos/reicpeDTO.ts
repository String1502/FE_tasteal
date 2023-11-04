//#region POST
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

export type Recipe = {
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

//#endregio
