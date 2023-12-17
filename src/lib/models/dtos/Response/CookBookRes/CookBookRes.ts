import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';

export type CookBookRes = {
    id: CookBookEntity['id'];
    name: CookBookEntity['name'];
};
