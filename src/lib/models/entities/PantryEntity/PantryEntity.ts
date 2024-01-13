import { AccountEntity } from "../AccountEntity/AccountEntity";

export type PantryEntity = {
  id: number;
  account_id: string;
  account?: AccountEntity;
};
