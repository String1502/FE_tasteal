import { AccountEntity } from '../AccountEntity/AccountEntity';
import { Cart_ItemEntity } from '../Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '../IngredientEntity/IngredientEntity';

export type PersonalCartItem = {
    id: number;
    ingredient_id: number | null;
    name: string;
    account_id: string;
    amount: number;
    is_bought: boolean;
    ingredient: IngredientEntity;
    account: AccountEntity;
};

export const convertPersonalCartItemToCartItem = (
    personalCartItem: PersonalCartItem
) => {
    return {
        cartId: personalCartItem.id,
        ingredientId: personalCartItem.ingredient_id,
        amount: personalCartItem.amount,
        isBought: personalCartItem.is_bought,
        ingredient: personalCartItem.ingredient,
    } as Cart_ItemEntity;
};
