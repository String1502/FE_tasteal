import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { CheckBoxButton } from '../components/ui/search/CheckBoxButton.tsx';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { SearchFilter } from '../components/ui/search/SearchFilter.tsx';
import Layout from '../layout/Layout';
import { SearchTextField } from '@/components/ui/search/SearchTextField.tsx';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import { useSearchRecipe } from '../components/ui/search/useSearchRecipe.tsx';
import { SearchInfiniteScroll } from '../components/ui/search/SearchInfiniteScroll.tsx';
import { KeyWordRes } from '@/lib/models/dtos/Response/KeyWordRes/KeyWordRes.ts';

export type TuKhoa = KeyWordRes & {
    value: boolean;
};

export const DefaultTuKhoas: TuKhoa[] = [
    {
        keyword: 'Bánh mì',
        value: false,
        frequency: 5,
    },
    {
        keyword: 'Bánh bao',
        value: false,
        frequency: 4,
    },
    {
        keyword: 'Heo quay',
        value: false,
        frequency: 3,
    },
    {
        keyword: 'Bún thịt nướng',
        value: false,
        frequency: 2,
    },
    {
        keyword: 'Cơm sườn',
        value: false,
        frequency: 1,
    },
    {
        keyword: 'Bún đậu',
        value: false,
        frequency: 0,
    },
];

const viewportItemAmount = 12;

function Search() {
    const {
        recipes,
        // filter,
        handleChangeFilter,
        textSearch,
        handleChangeTextSearch,
        tuKhoas,
        handleChangeTuKhoa,
        loadNext,
        end,
    } = useSearchRecipe(viewportItemAmount);

    return (
        <Layout withFooter={false}>
            <Box>
                <Container>
                    <Grid
                        container
                        spacing={4}
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            my: 4,
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Box>
                                <SearchTextField
                                    textSearch={textSearch}
                                    handleChangeTextSearch={
                                        handleChangeTextSearch
                                    }
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
                                        key={item.keyword}
                                        label={item.keyword}
                                        value={item.value}
                                        handleChangeTuKhoa={handleChangeTuKhoa}
                                    />
                                ))}
                            </Stack>

                            <SearchInfiniteScroll
                                loadNext={loadNext}
                                dataLenght={recipes.length}
                                end={end}
                            >
                                {recipes.map((item) => (
                                    <Box
                                        key={item.id}
                                        sx={{
                                            p: 1,
                                            width: {
                                                xs: '100%',
                                                sm: 'calc(100%/2)',
                                                md: 'calc(100%/3)',
                                            },
                                        }}
                                    >
                                        <PrimaryCard
                                            recipe={item as RecipeEntity}
                                            props={{
                                                sx: {
                                                    width: '100%',
                                                },
                                            }}
                                        />
                                    </Box>
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
