import {
    accounts,
    carts as cartSampleData,
    recipes,
} from '@/lib/constants/sampleData';
import simulateDelay from '@/utils/promises/stimulateDelay';
import { CartEntity } from '../models/entities/CartEntity/CartEntity';
import { getApiUrl } from '../constants/api';
import { AccountEntity } from '../models/entities/AccountEntity/AccountEntity';

class CartService {
    // Bỏ GetAllCarts!
    public static GetAllCarts(): Promise<CartEntity[]> {
        simulateDelay(1);

        const carts: CartEntity[] = cartSampleData.map((cart) => {
            return {
                ...cart,
                account: accounts.find(
                    (account) => account.uid === cart.accountId
                ),
                recipe: recipes.find((recipe) => recipe.id === cart.recipeId),
            };
        });

        return Promise.resolve(carts);
    }

    public static async GetCartByAccountId(
        accountId: AccountEntity['uid']
    ): Promise<CartEntity[]> {
        // const allCarts = await this.GetAllCarts();
        // return Promise.resolve(
        //   allCarts.filter((cart) => cart.accountId === accountId)
        // );

        let carts: CartEntity[] = [];

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        await fetch(
            `${getApiUrl('GetAllCartByAccountId')}?accountId=${accountId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => {
                carts = data;
            })
            .catch((error) => {
                console.error('Lỗi:', error);
                throw error;
            });

        console.log(carts);

        return carts;
    }

    public static async DeleteCartByAccountId(
        accountId: AccountEntity['uid']
    ): Promise<boolean> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        return await fetch(
            `${getApiUrl('DeleteAllCartByAccountId')}?accountId=${accountId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.error('Lỗi:', error);
                throw error;
            });
    }

    public static async UpdateCart(
        CardId: CartEntity['id'],
        servingSize: CartEntity['serving_size']
    ): Promise<boolean> {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        return await fetch(
            `${getApiUrl(
                'UpdateCart'
            )}?CardId=${CardId}&servingSize=${servingSize}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.error('Lỗi:', error);
                throw error;
            });
    }

    public static async DeleteCartById(
        cartId: CartEntity['id']
    ): Promise<boolean> {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        };

        return await fetch(
            `${getApiUrl('DeleteCartById')}?cardId=${cartId}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((data) => data)
            .catch((error) => {
                console.error('Lỗi:', error);
                throw error;
            });
    }
}

export default CartService;
