import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect } from 'react';
import { CheckBoxButton } from '../components/ui/search/CheckBoxButton.tsx';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { SearchFilter } from '../components/ui/search/SearchFilter.tsx';
import Layout from '../layout/Layout';
import { SearchTextField } from '@/components/ui/search/SearchTextField.tsx';
import { removeDiacritics } from '@/utils/format/index.ts';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import RecipeService from '@/lib/services/recipeService.ts';
import InfiniteScroll from 'react-infinite-scroll-component';
import AppContext from '@/lib/contexts/AppContext.ts';

export type TuKhoa = {
    label: string;
    value: boolean;
};

export const DefaultTuKhoas: TuKhoa[] = [
    {
        label: 'Bánh mì',
        value: false,
    },
    {
        label: 'Bánh bao',
        value: false,
    },
    {
        label: 'Heo quay',
        value: false,
    },
    {
        label: 'Bún thịt nướng',
        value: false,
    },
    {
        label: 'Cơm sườn',
        value: false,
    },
    {
        label: 'Bún đậu',
        value: false,
    },
];

type Filter = {
    ingredientID: number[];
    exceptIngredientID: number[];
    totalTime: number;
    activeTime: number;
    occasionID: number[];
    calories: {
        min: number;
        max: number;
    };
    textSearch: string;
    keyWords: string[];
};

const viewportItemAmount = 12;

function Search() {
    const [recipes, setRecipes] = React.useState<RecipeEntity[]>([]);
    const [resultIds, setResultIds] = React.useState<RecipeEntity['id'][]>([]);
    const { handleSpinner } = useContext(AppContext);

    useEffect(() => {
        async function fetchData() {
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
    return (
        <Layout>
            <Box
                component={'div'}
                id="scrollableDiv"
            >
                <Container>
                    <Grid
                        container
                        spacing={4}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            width: '100%',
                            my: 8,
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Box>
                                <SearchTextField
                                    searchButtonClick={searchButtonClick}
                                />
                            </Box>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            lg={3}
                            sx={{ mt: 2 }}
                        >
                            <SearchFilter
                                handleChangeFilter={handleChangeFilter}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            lg={9}
                            sx={{ mt: 2 }}
                        >
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Công thức phổ biến
                            </Typography>

                            <Stack
                                flexWrap={'wrap'}
                                direction="row"
                                sx={{ my: 2 }}
                            >
                                {tuKhoas.map((item) => (
                                    <CheckBoxButton
                                        key={item.label}
                                        label={item.label}
                                        value={item.value}
                                        handleChangeTuKhoa={handleChangeTuKhoa}
                                    />
                                ))}
                            </Stack>

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={2}
                            >
                                <InfiniteScroll
                                    // 3*2*2
                                    dataLength={viewportItemAmount}
                                    next={loadNext}
                                    hasMore={resultIds.length != recipes.length}
                                    scrollableTarget="scrollableDiv"
                                    loader={<h4>Loading...</h4>}
                                >
                                    {recipes.map((item, index) => (
                                        <>
                                            {item && (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    key={index}
                                                >
                                                    <PrimaryCard
                                                        recipe={
                                                            item as RecipeEntity
                                                        }
                                                    />
                                                </Grid>
                                            )}
                                        </>
                                    ))}
                                </InfiniteScroll>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
}

export default Search;
