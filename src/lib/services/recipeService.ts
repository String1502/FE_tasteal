import { getApiUrl } from '@/lib/constants/api';
import { recipes as recipesSampleData } from '@/lib/constants/sampleData';
import { RecipeRes } from '@/lib/models/dtos/Response/RecipeRes/RecipeRes';
import { createDebugStringFormatter } from '@/utils/debug/formatter';
import simulateDelay from '@/utils/promises/stimulateDelay';
import { ApiPath, DefaultPage } from '../constants/common';
import { deleteImage } from '../firebase/image';
import { RecipeReq } from '../models/dtos/Request/RecipeReq/RecipeReq';
import { RecipeSearchReq } from '../models/dtos/Request/RecipeSearchReq/RecipeSearchReq';
import { RecipeEntity } from '../models/entities/RecipeEntity/RecipeEntity';
import { PageFilter } from '../models/dtos/Request/PageFilter/PageFilter';

const DEBUG_IDENTIFIER = '[RecipeService]';
const createDebugString = createDebugStringFormatter(DEBUG_IDENTIFIER);

/**
 * Represents a service for managing occasions.
 */
class RecipeService {
    /**
     * Retrieves all occasions.
     *
     * @return {Promise<RecipeEntity[]>}
     */
    public static GetAllRecipes(): Promise<RecipeEntity[]> {
        return Promise.resolve(recipesSampleData);
    }

    /**
     * Get recipe detail data by id.
     * NOTE: This method is not implemented yet.
     *
     * @param id - The id of the recipe.
     * @returns - The recipe detail data.
     */
    public static GetById(id: number): Promise<RecipeRes> {
        return fetch(`${getApiUrl('GetRecipe')}?id=${id}`, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((data) => data)
            .catch((err) => {
                throw err;
            });
    }

    /**
     * Fetch recipes that belong to a specific account.
     *
     * @param accountId - The id of the account.
     * @returns
     */
    public static GetByAccountId(accountId: string) {
        // Simulate delay of 1 second
        simulateDelay(1);

        return Promise.resolve(
            recipesSampleData.filter((recipe) => recipe.author === accountId)
        );
    }

    public static async GetNewReleaseRecipes(
        limit: number
    ): Promise<RecipeEntity[]> {
        let recipes: RecipeEntity[] = [];

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                pageSize: limit,
                page: DefaultPage,
                isDescend: true,
            } as PageFilter),
        };

        await fetch(getApiUrl('GetRecipeByDateTime'), requestOptions)
            .then((response) => response.json())
            .then((data) => {
                recipes = data;
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });

        console.log(recipes);

        return recipes;
    }

    public static async GetTrendingRecipes(
        limit: number
    ): Promise<RecipeEntity[]> {
        let recipes: RecipeEntity[] = [];

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                pageSize: limit,
                page: DefaultPage,
                isDescend: true,
            } as PageFilter),
        };

        await fetch(getApiUrl('GetRecipeByRating'), requestOptions)
            .then((response) => response.json())
            .then((data) => {
                recipes = data;
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });

        return recipes;
    }

    public static async SearchRecipes(
        filter: RecipeSearchReq
    ): Promise<RecipeEntity[]> {
        let recipes: RecipeEntity[] = [];

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                ...filter,
            }),
        };

        await fetch(getApiUrl('SearchRecipe'), requestOptions)
            .then((response) => response.json())
            .then((data) => {
                recipes = data;
                console.log(data);
            })
            .catch((error) => {
                console.error('Lỗi:', error);
            });

        return recipes;
    }
    //#region POST

    /**
     * Create a new recipe
     */
    public static async CreateRecipe(postData: RecipeReq) {
        fetch(getApiUrl('CreateRecipe'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
            .then((response: Response) => {
                if (response.ok) {
                    console.log(response);
                    return response.json();
                }

                const error = new Error('Fail to parse json response');

                return Promise.reject(error);
            })
            .then((data: RecipeReq) => {
                console.log(
                    createDebugString('POST succeeded!', 'CreateRecipe'),
                    data
                );
                return data;
            })
            .catch((e) => {
                // Initial handle
                switch (e.code) {
                    default:
                        // TODO: test this
                        // This is not tested
                        deleteImage(postData.image).catch();
                        Promise.all(
                            postData.directions.map((direction) =>
                                deleteImage(direction.image)
                            )
                        ).catch();
                        break;
                }

                const msg = createDebugString('POST fail!', 'CreateRecipe');
                console.error(msg, e);
                return Promise.reject(e);
            });
    }

    //#endregion
}

export default RecipeService;
