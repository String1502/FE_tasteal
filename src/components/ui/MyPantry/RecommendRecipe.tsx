import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Box, Stack, Typography } from '@mui/material';
import { BoxIngredientTypeSkeleton } from './BoxIngredientTypeSkeleton';
import { PrimaryCard } from '@/components/common/card/PrimaryCard';
import { useEffect, useState } from 'react';
import PantryService from '@/lib/services/pantryService';
import { PageReq } from '@/lib/models/dtos/Request/PageReq/PageReq';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderInfiniteScroll from '../search/LoaderInfiniteScroll';

function RecommendRecipe({
  pantryItems,
  recommendRecipes,
  loadMoreButton,
}: {
  pantryItems: Pantry_ItemEntity[];
  recommendRecipes: RecipeEntity[] | undefined;
  loadMoreButton?: React.ReactNode;
}) {
  // Need by more
  const [needByMoreRecipes, setNeedByMoreRecipes] = useState<
    RecipeEntity[] | undefined
  >(undefined);

  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: 12,
  });
  const [end, setEnd] = useState(false);

  const loadMore = async () => {
    const recommend = await PantryService.GetRecipesByIngredientsAny({
      ingredients: pantryItems.map((item) => item.ingredient_id),
      page: {
        ...page,
        page: page.page + 1,
      },
    });
    if (recommend.length < page.pageSize) {
      setEnd(true);
    }
    if (needByMoreRecipes) {
      setNeedByMoreRecipes((prev) => [...prev, ...recommend]);
    } else {
      setNeedByMoreRecipes(recommend);
    }

    setPage((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  useEffect(() => {
    async function fetch() {
      try {
        await loadMore();
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <>
      <Stack direction={'column'} sx={{ width: '100%' }} gap={2}>
        {/* Gợi ý */}
        <Typography
          variant="body1"
          fontWeight={'bold'}
          sx={{
            width: '100%',
            textAlign: 'center',
            p: 2,
            borderRadius: '24px',
            bgcolor: 'primary.main',
            color: 'white',
          }}
        >
          Tuyệt vời bạn có thể nấu {recommendRecipes?.length ?? 0} món ăn với{' '}
          {pantryItems.length} nguyên liệu!
        </Typography>

        {!recommendRecipes && <BoxIngredientTypeSkeleton />}

        <Stack
          direction={'row'}
          sx={{ width: '100%', pt: 2, p: 1 }}
          flexWrap={'wrap'}
        >
          {recommendRecipes &&
            recommendRecipes.map((recipe) => (
              <Box
                key={recipe.id}
                sx={{
                  width: {
                    xs: 'calc(100% / 1)',
                    sm: 'calc(100% / 2)',
                    md: 'calc(100% / 3)',
                    lg: 'calc(100% / 4)',
                  },
                  p: 1,
                }}
              >
                <PrimaryCard recipe={recipe} />
              </Box>
            ))}
        </Stack>

        {loadMoreButton && (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            {loadMoreButton}
          </Box>
        )}

        {/* Mua thêm nguyên liệu */}
        <Typography
          variant="h5"
          fontWeight={900}
          sx={{
            width: '100%',
            textAlign: 'left',
            p: 2,
            borderRadius: '24px',
          }}
        >
          Bạn cần mua thêm một số nguyên liệu
        </Typography>

        {!needByMoreRecipes && <BoxIngredientTypeSkeleton />}

        <InfiniteScroll
          // 3*2*2
          dataLength={needByMoreRecipes?.length ?? 0}
          next={loadMore}
          hasMore={!end}
          loader={
            <>
              <LoaderInfiniteScroll />
            </>
          }
          endMessage={
            <>
              {needByMoreRecipes && (
                <Typography
                  variant="body1"
                  align="center"
                  fontWeight={'bold'}
                  sx={{
                    width: '100%',
                    mt: 4,
                    color: 'grey.500',
                  }}
                >
                  {needByMoreRecipes.length == 0
                    ? 'Hệ thống chưa có công thức phù hợp!'
                    : 'Đã hiển thị toàn bộ công thức phù hợp!'}
                </Typography>
              )}
            </>
          }
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            margin: -1,
            overflow: 'visible',
          }}
        >
          {needByMoreRecipes &&
            needByMoreRecipes.map((recipe) => (
              <Box
                key={recipe.id}
                sx={{
                  width: {
                    xs: 'calc(100% / 1)',
                    sm: 'calc(100% / 2)',
                    md: 'calc(100% / 3)',
                    lg: 'calc(100% / 4)',
                  },
                  p: 1,
                }}
              >
                <PrimaryCard recipe={recipe} />
              </Box>
            ))}
        </InfiniteScroll>
      </Stack>
    </>
  );
}

export default RecommendRecipe;
