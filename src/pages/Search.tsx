import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CheckBoxButton } from '../components/ui/search/CheckBoxButton.tsx';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { SearchFilter } from '../components/ui/search/SearchFilter.tsx';
import Layout from '../layout/Layout';
import { SearchTextField } from '@/components/ui/search/SearchTextField.tsx';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import { useSearchRecipe } from '../components/ui/search/useSearchRecipe.tsx';
import { SearchInfiniteScroll } from '../components/ui/search/SearchInfiniteScroll.tsx';

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

export type Filter = {
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
    const {
        recipes,
        resultIds,
        searchButtonClick,
        // filter,
        handleChangeFilter,
        tuKhoas,
        handleChangeTuKhoa,
        loadNext,
    } = useSearchRecipe(viewportItemAmount);
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

                            <SearchInfiniteScroll
                                viewportItemAmount={viewportItemAmount}
                                loadNext={loadNext}
                                resultIds={resultIds}
                                recipes={recipes}
                            >
                                {recipes.map((item, index) => (
                                    <>
                                        {item && (
                                            <Box
                                                key={item.id}
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
                            </SearchInfiniteScroll>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
}

export default Search;
