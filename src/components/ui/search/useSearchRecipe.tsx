import React, { useCallback, useContext, useEffect } from 'react';
import { removeDiacritics } from '@/utils/format/index.ts';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import RecipeService from '@/lib/services/recipeService.ts';
import AppContext from '@/lib/contexts/AppContext.ts';
import { TuKhoa, DefaultTuKhoas } from '../../../pages/Search.tsx';
import {
    RecipeSearchReq,
    RecipeSearchReq_Key,
    initRecipeSearchReq,
    isValidRecipeSearchReq,
} from '@/lib/models/dtos/Request/RecipeSearchReq/RecipeSearchReq.ts';

export function useSearchRecipe(viewportItemAmount: number = 12) {
    const [recipes, setRecipes] = React.useState<RecipeEntity[]>([]);
    // const [resultIds, setResultIds] = React.useState<RecipeEntity['id'][]>([]);
    const { handleSpinner } = useContext(AppContext);
    const [page, setPage] = React.useState(1);
    const [end, setEnd] = React.useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await RecipeService.GetAllRecipes(
                    viewportItemAmount,
                    page
                );
                const tukhoa = (await RecipeService.GetKeyWords())
                    .map((item) => {
                        return {
                            ...item,
                            value: false,
                        };
                    })
                    .slice(0, 12);
                setTuKhoas(tukhoa);

                setRecipes(data.filter((item) => item && !item.is_private));
            } catch (error) {
                console.log(error);
                handleSpinner(false);
            }
        }
        fetchData();
    }, []);

    //#region Search
    const [textSearch, setTextSearch] = React.useState('');

    const handleChangeTextSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTextSearch(event.target.value);
        },
        []
    );
    const handleTextSearch = useCallback(
        (item?: RecipeEntity) => {
            if (!item) return false;

            const value = textSearch;
            if (!value || value == '') {
                return true;
            }

            const str = JSON.stringify([
                item?.name,
                item?.rating,
                item?.totalTime,
                item?.serving_size,
                item?.introduction,
                item?.author_note,
                item?.account?.name,
                item?.ingredients?.map((i) => i.name),
            ]);

            return removeDiacritics(str.toLocaleLowerCase()).includes(
                removeDiacritics(value.toLocaleLowerCase())
            );
        },
        [textSearch]
    );

    //#endregion
    //#region Filter
    const [filter, setFilter] =
        React.useState<RecipeSearchReq>(initRecipeSearchReq);

    function handleChangeFilter(type: RecipeSearchReq_Key, value: any) {
        const newFilter = {
            ...filter,
            [type]: value,
        };
        console.log(newFilter);

        setFilter(newFilter);
        if (type == 'TextSearch') return;

        async function fetchData() {
            if (!isValidRecipeSearchReq(newFilter)) {
                return;
            }
            // const newData = await RecipeService.SearchRecipes(newFilter,  viewportItemAmount, 1);
            // setPage(1);
            // setEnd(false);
            // setRecipes(newData);
        }
        fetchData();
    }

    //#endregion

    //#region Từ khóa
    const [tuKhoas, setTuKhoas] = React.useState<TuKhoa[]>([]);

    const handleChangeTuKhoa = (tukhoa: TuKhoa) => {
        const newTuKhoas = [...tuKhoas].map((item) => {
            if (item.keyword === tukhoa.keyword) {
                return {
                    ...item,
                    value: !item.value,
                };
            } else {
                return item;
            }
        });
        setTuKhoas(newTuKhoas);
        let keyWords = newTuKhoas
            .map((item) => {
                if (item.value && item.keyword) {
                    return removeDiacritics(item.keyword);
                }
            })
            .filter(Boolean);
        handleChangeFilter('KeyWords', keyWords.length == 0 ? null : keyWords);
    };

    //#endregion

    //#region Infinite Scroll
    const loadNext = useCallback(async () => {
        let nextData: RecipeEntity[] = [];
        if (isValidRecipeSearchReq(filter)) {
            // nextData = await RecipeService.SearchRecipes(
            //     filter,
            //     viewportItemAmount,
            //     page + 1
            // );
        } else {
            nextData = await RecipeService.GetAllRecipes(
                viewportItemAmount,
                page + 1
            );
        }

        if (nextData.length == 0) {
            setEnd(true);
            return;
        }

        setPage((prev) => prev + 1);
        setRecipes((prev) => [...prev, ...nextData]);
    }, [recipes]);
    //#endregion
    return {
        recipes: recipes.filter(handleTextSearch),
        filter,
        handleChangeFilter,
        textSearch,
        handleChangeTextSearch,
        handleTextSearch,
        tuKhoas,
        handleChangeTuKhoa,
        loadNext,
        end,
    };
}
