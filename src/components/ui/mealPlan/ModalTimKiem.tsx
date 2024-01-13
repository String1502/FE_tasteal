import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { CustomDialog } from '../../common/dialog/CustomDialog';
import { SearchTextField } from '../search/SearchTextField';
import CustomCardMealPlan from './CustomCard';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { useCallback, useEffect, useState } from 'react';
import RecipeService from '@/lib/services/recipeService';
import { PageReq } from '@/lib/models/dtos/Request/PageReq/PageReq';
import { removeDiacritics } from '@/utils/format';

const viewportItemAmount = 6 * 5;

export function ModalTimKiem({
  open,
  handleClose,
  title,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
}) {
  const [textSearch, setTextSearch] = useState('');
  const [recipes, setRecipes] = useState<RecipeEntity[] | undefined>(undefined);
  const [end, setEnd] = useState(false);
  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: viewportItemAmount,
  });

  const loadMore = async (refresh = false) => {
    const data = await RecipeService.SearchRecipes({
      ...page,
      page: refresh ? 1 : page.page + 1,
    });
    if (data.length < page.pageSize) {
      setEnd(true);
    }
    if (recipes && !refresh) {
      setRecipes([...recipes, ...data]);
    } else {
      setRecipes(data);
    }
    setPage({
      ...page,
      page: refresh ? 1 : page.page + 1,
    });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        await loadMore(true);
      } catch (error) {
        setRecipes([]);
      }
    }
    fetchData();
  }, []);

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
        item?.direction?.map((i) => i.direction),
      ]);

      return removeDiacritics(str.toLocaleLowerCase()).includes(
        removeDiacritics(value.toLocaleLowerCase())
      );
    },
    [textSearch]
  );

  return (
    <CustomDialog open={open} handleClose={handleClose} title={title}>
      <Box sx={{ width: '100%', py: 2 }}>
        <SearchTextField
          textSearch={textSearch}
          handleChangeTextSearch={(event) => setTextSearch(event.target.value)}
          props={{
            size: 'small',
          }}
          hideSearchButton={true}
        />
      </Box>

      {!recipes && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bgcolor: 'grey.300',
            borderRadius: '24px',
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {recipes && (
        <>
          <Stack
            direction={'row'}
            flexWrap={'wrap'}
            sx={{
              width: '100%',
            }}
          >
            {recipes &&
              recipes
                .filter((item) => handleTextSearch(item))
                .map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: {
                        xs: '100%',
                        sm: 'calc(100%/2)',
                        md: 'calc(100%/3)',
                      },
                      p: 1,
                    }}
                  >
                    <CustomCardMealPlan recipe={item as RecipeEntity} />
                  </Box>
                ))}
          </Stack>

          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Button
              variant="contained"
              onClick={() => loadMore()}
              disabled={end}
              sx={{
                px: 2,
              }}
              size="small"
            >
              {end ? 'Đã hiển thị toàn bộ công thức' : 'Xem thêm'}
            </Button>
          </Box>
        </>
      )}
    </CustomDialog>
  );
}
