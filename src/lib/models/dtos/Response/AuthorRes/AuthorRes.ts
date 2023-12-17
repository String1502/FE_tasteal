import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';

export type AuthorRes = {
    uid: AccountEntity['uid'];
    name?: AccountEntity['name'];
    avatar?: AccountEntity['avatar'];
    introduction?: AccountEntity['introduction'];
    link?: AccountEntity['link'];
    slogan?: AccountEntity['slogan'];
    quote?: AccountEntity['quote'];
    RecipeCount?: number;
};
