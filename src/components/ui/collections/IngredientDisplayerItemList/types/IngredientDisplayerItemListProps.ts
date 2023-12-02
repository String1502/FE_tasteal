import { IngredientRes } from '@/lib/models/dtos/Response/IngredientRes/IngredientRes';

type IngredientDisplayerItemListProps = {
    ingredients: IngredientRes[];
    servingSize: number;
};

export default IngredientDisplayerItemListProps;
