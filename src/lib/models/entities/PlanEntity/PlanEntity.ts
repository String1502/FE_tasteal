import { AccountEntity } from "../AccountEntity/AccountEntity";

export type PlanEntity = {
  id: number;
  account_id: string;
  date: Date;
  note?: string;
  AccountEntity?: AccountEntity;
};
