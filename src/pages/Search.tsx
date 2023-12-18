import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { CheckBoxButton } from '../components/ui/search/CheckBoxButton.tsx';
import { PrimaryCard } from '../components/common/card/PrimaryCard.tsx';
import { SearchFilter } from '../components/ui/search/SearchFilter.tsx';
import Layout from '../layout/Layout';
import { SearchTextField } from '@/components/ui/search/SearchTextField.tsx';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity.ts';
import { useSearchRecipe } from '../components/ui/search/useSearchRecipe.tsx';
import { SearchInfiniteScroll } from '../components/ui/search/SearchInfiniteScroll.tsx';
import { KeyWordRes } from '@/lib/models/dtos/Response/KeyWordRes/KeyWordRes.ts';
import { useEffect, useState } from 'react';
import { headerHeight } from '@/components/ui/layout/Header.tsx';
import { CloseRounded } from '@mui/icons-material';
import { isRecipeSearchReqValid } from '@/lib/models/dtos/Request/RecipeSearchReq/RecipeSearchReq.ts';
import SortSelect from '@/components/ui/search/SortSelect.tsx';

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
    filter,
    resetFilter,
    handleChangeFilter,
    textSearch,
    handleChangeTextSearch,
    tuKhoas,
    handleChangeTuKhoa,
    loadNext,
    end,
    sortType,
    handleSort,
  } = useSearchRecipe(viewportItemAmount);
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
  });

  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Layout withFooter={false}>
      <Box>
        <Container>
          <Grid
            container
            spacing={4}
            sx={{
              justifyContent: 'center',
              alignItems: 'stretch',
              my: 4,
            }}
          >
            <Grid item xs={12}>
              <Box>
                <SearchTextField
                  textSearch={textSearch}
                  handleChangeTextSearch={handleChangeTextSearch}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={3} sx={{ mt: 2 }}>
              <Box
                sx={{
                  position: {
                    xs: 'static',
                    lg: 'sticky',
                  },
                  top: `${0}px`,
                  transform: {
                    lg: !trigger
                      ? scrollPos < headerHeight + 68
                        ? `translateY(${0}px)`
                        : `translateY(${headerHeight}px)`
                      : `translateY(${0}px)`,
                  },
                  transition: 'transform 0.2s ease-in-out',
                  maxHeight: { lg: '100dvh' },
                  height: 'auto',
                }}
              >
                <SearchFilter
                  handleChangeFilter={handleChangeFilter}
                  filter={filter}
                />
              </Box>
            </Grid>

            <Grid item xs={12} lg={9} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Công thức phổ biến
                  </Typography>

                  {isRecipeSearchReqValid(filter) && (
                    <Button
                      sx={{ ml: 2 }}
                      variant="outlined"
                      onClick={resetFilter}
                      startIcon={<CloseRounded fontSize="small" />}
                    >
                      <Typography
                        variant="caption"
                        color={'primary'}
                        sx={{
                          fontWeight: 'bold',
                          textTransform: 'none',
                        }}
                      >
                        Đặt lại filter
                      </Typography>
                    </Button>
                  )}
                </Box>

                <Box>
                  <SortSelect handleSort={handleSort} sortType={sortType} />
                </Box>
              </Box>

              <Stack flexWrap={'wrap'} direction="row" sx={{ my: 2 }}>
                {tuKhoas.map(
                  (item) =>
                    item && (
                      <CheckBoxButton
                        key={item.keyword}
                        item={item}
                        handleChangeTuKhoa={handleChangeTuKhoa}
                      />
                    )
                )}
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
