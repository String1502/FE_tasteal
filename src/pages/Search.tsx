import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
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
import { PrimaryCardSkeleton } from '@/components/ui/home/PrimaryCardSkeleton.tsx';

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

                            <InfiniteScroll
                                // 3*2*2
                                dataLength={viewportItemAmount}
                                next={loadNext}
                                hasMore={resultIds.length != recipes.length}
                                scrollableTarget="scrollableDiv"
                                loader={
                                    <>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: 2,
                                                p: 2,
                                            }}
                                        >
                                            <CircularProgress
                                                size={30}
                                                color="primary"
                                            />
                                            <Typography
                                                variant="body1"
                                                fontWeight={'bold'}
                                                color={'primary'}
                                            >
                                                Đang tải dữ liệu...
                                            </Typography>
                                        </Box>
                                    </>
                                }
                                endMessage={
                                    <>
                                        <Typography
                                            variant="body1"
                                            align="center"
                                            fontWeight={'bold'}
                                            sx={{
                                                width: '100%',
                                                mt: 6,
                                                color: 'grey.600',
                                            }}
                                        >
                                            Không còn công thức phù hợp!
                                        </Typography>
                                    </>
                                }
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    margin: -1,
                                    overflow: 'visible',
                                }}
                            >
                                {recipes.map((item, index) => (
                                    <>
                                        {item && (
                                            <Box
                                                key={index.toString()}
                                                sx={{
                                                    flexBasis: {
                                                        xs: '100%',
                                                        sm: 'calc(99.2%/2)',
                                                        md: 'calc(99.3%/3)',
                                                    },
                                                    p: 1,
                                                    mr:
                                                        index !=
                                                        recipes.length - 1
                                                            ? 0
                                                            : 'auto',
                                                }}
                                            >
                                                <PrimaryCard
                                                    recipe={
                                                        item as RecipeEntity
                                                    }
                                                />
                                            </Box>
                                        )}
                                    </>
                                ))}
                            </InfiniteScroll>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
}

export default Search;
