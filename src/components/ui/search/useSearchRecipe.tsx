import React, { useCallback, useContext, useEffect } from 'react';
import { removeDiacritics } from '@/utils/format/index.ts';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import RecipeService from '@/lib/services/recipeService.ts';
import AppContext from '@/lib/contexts/AppContext.ts';
import { Filter, TuKhoa, DefaultTuKhoas } from '../../../pages/Search.tsx';

export function useSearchRecipe(viewportItemAmount: number = 12) {
    const [recipes, setRecipes] = React.useState<RecipeEntity[]>([]);
    const [resultIds, setResultIds] = React.useState<RecipeEntity['id'][]>([]);
    const { handleSpinner } = useContext(AppContext);

    useEffect(() => {
        async function fetchData() {
            try {
                handleSpinner(true);
                const ids = (await RecipeService.GetAllRecipes()).map(
                    (recipe) => recipe.id
                );
                setResultIds(ids);

                // const initData = await RecipeService.GetRecipes(
                //     ids.slice(0, viewportItemAmount)
                // );
                // setRecipes(initData);
                setRecipes(await RecipeService.GetAllRecipes());
                handleSpinner(false);
            } catch (error) {
                console.log(error);
                handleSpinner(false);
            }
        }
        fetchData();
    }, []);

    //#region Search
    function searchButtonClick(value: string) {
        handleChangeFilter('textSearch', value);
    }

    //#endregion
    //#region Filter
    const [filter, setFilter] = React.useState<Filter>({
        ingredientID: [],
        exceptIngredientID: [],
        totalTime: 0,
        activeTime: 0,
        occasionID: [],
        calories: {
            min: 0,
            max: Infinity,
        },
        textSearch: '',
        keyWords: [],
    });

    function handleChangeFilter(
        type:
            | 'ingredientID'
            | 'exceptIngredientID'
            | 'totalTime'
            | 'activeTime'
            | 'occasionID'
            | 'calories'
            | 'textSearch'
            | 'keyWords',
        value: any
    ) {
        setFilter((prev) => {
            return {
                ...prev,
                [type]: value,
            };
        });
    }

    useEffect(() => {
        async function fetchData() {
            handleSpinner(true);
            // const ids = await RecipeService.GetRecipesByFilter(filter);
            // setResultIds(ids);
            // const initData = await RecipeService.GetRecipes(
            //     ids.slice(0, viewportItemAmount)
            // );
            // setRecipes(initData);
            handleSpinner(false);
        }
        fetchData();
    }, [filter]);

    //#endregion
    //#region Từ khóa
    const [tuKhoas, setTuKhoas] = React.useState<TuKhoa[]>(DefaultTuKhoas);

    const handleChangeTuKhoa = (tukhoa: TuKhoa) => {
        setTuKhoas((prev) => {
            return prev.map((item) => {
                if (item.label === tukhoa.label) {
                    return {
                        ...item,
                        value: !item.value,
                    };
                } else {
                    return item;
                }
            });
        });
    };

    useEffect(() => {
        let keyWords = tuKhoas
            .map((item) => {
                if (item.value && item.label) {
                    return removeDiacritics(item.label);
                }
            })
            .filter(Boolean);
        handleChangeFilter('keyWords', keyWords);
    }, [tuKhoas]);
    //#endregion
    //#region Infinite Scroll
    const loadNext = useCallback(async () => {
        // const nextData = await RecipeService.GetRecipes(
        //     resultIds.slice(recipes.length, viewportItemAmount)
        // );
        // setRecipes((prev) => [...prev, ...nextData]);
    }, [resultIds]);
    //#endregion
    return {
        recipes,
        resultIds,
        searchButtonClick,
        filter,
        handleChangeFilter,
        tuKhoas,
        handleChangeTuKhoa,
        loadNext,
    };
}
