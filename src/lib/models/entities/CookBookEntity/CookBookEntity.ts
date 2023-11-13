import { AccountEntity } from "../AccountEntity/AccountEntity";

export type CookBookEntity = {
  id: number;
  name: string;
  owner?: string;
  account?: AccountEntity;
};
