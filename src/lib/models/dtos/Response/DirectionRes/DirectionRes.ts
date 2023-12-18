import { Recipe_DirectionEntity } from '@/lib/models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity';

export type DirectionRes = {
    step: Recipe_DirectionEntity['step'];
    image: Recipe_DirectionEntity['image'];
    direction: Recipe_DirectionEntity['direction'];
};
