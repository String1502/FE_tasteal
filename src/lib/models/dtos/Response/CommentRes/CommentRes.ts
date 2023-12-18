import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export type CommentRes = {
    uid: AccountEntity['uid'];
    name: AccountEntity['name'];
    comment: string;
};
