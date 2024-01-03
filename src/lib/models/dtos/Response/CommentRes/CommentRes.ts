import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export type CommentRes = {
  id: number;
  account_id: AccountEntity['uid'];
  name: AccountEntity['name'];
  comment: string;
};
