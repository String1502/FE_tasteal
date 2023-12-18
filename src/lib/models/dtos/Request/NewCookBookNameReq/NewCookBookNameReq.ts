import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';

export type NewCookBookNameReq = {
  id: CookBookEntity['id'];
  name: CookBookEntity['name'];
};
