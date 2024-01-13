import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export type NewCookBookReq = {
  name: string;
  owner: AccountEntity['uid'];
};
