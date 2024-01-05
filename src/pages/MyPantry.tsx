import React, { useContext, useEffect, useState } from 'react';

import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Stack,
  TypographyProps,
  Button,
} from '@mui/material';
import Layout from '../layout/Layout';

import { PageRoute } from '@/lib/constants/common';
import TastealBreadCrumbs from '@/components/common/breadcrumbs/TastealBreadcrumbs';
import PantryContent from '@/components/ui/MyPantry/PantryContent';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import AppContext from '@/lib/contexts/AppContext';
import RecommendRecipe from '@/components/ui/MyPantry/RecommendRecipe';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import PantryService from '@/lib/services/pantryService';
import { PageReq } from '@/lib/models/dtos/Request/PageReq/PageReq';

const MyPantry: React.FC = () => {
  //#region Tab value
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  //#endregion

  const { login } = useContext(AppContext);

  // tab tủ lạnh
  const [pantryItems, setPantryItems] = useState<Pantry_ItemEntity[]>([]);

  const hanlePantryItemsChange = (
    type: 'add' | 'remove' | 'update',
    item: Pantry_ItemEntity[]
  ) => {
    const ids = item.map((i) => i.id);
    switch (type) {
      case 'add':
        setPantryItems((prev) => [...prev, ...item]);
        break;
      case 'remove':
        setPantryItems((prev) => prev.filter((i) => !ids.includes(i.id)));
        break;
      case 'update':
        setPantryItems((prev) => {
          return prev.map((i) => {
            if (ids.includes(i.id)) {
              return item.find((item) => item.id === i.id)!;
            } else {
              return i;
            }
          });
        });
        break;
    }
  };

  // tab gợi ý
  const [recommendRecipes, setRecommendRecipes] = useState<
    RecipeEntity[] | undefined
  >(undefined);
  const [page, setPage] = useState<PageReq>({
    page: 0,
    pageSize: 8,
  });
  const [end, setEnd] = useState(false);

  const loadMore = async () => {
    const recommend = await PantryService.GetRecipesByIngredientsAll({
      ingredients: pantryItems.map((item) => item.ingredient_id),
      page: {
        ...page,
        page: page.page + 1,
      },
    });
    if (recommend.length < page.pageSize) {
      setEnd(true);
    }
    if (recommendRecipes) {
      setRecommendRecipes((prev) => [...prev, ...recommend]);
    } else {
      setRecommendRecipes(recommend);
    }

    setPage((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  // use effect
  useEffect(() => {
    async function fetch() {
      try {
        await loadMore();
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [pantryItems]);

  useEffect(() => {
    async function fetch() {
      try {
        if (!login.user) {
          return;
        }
        // lấy pantryItems
        // setPantryItems
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [login.user]);

  return (
    <Layout withFooter={false} headerPosition="static" isDynamicHeader={false}>
      <Container>
        <Box sx={{ mt: 4, mb: 2 }}>
          <TastealBreadCrumbs links={breadCrumbsLinks} />
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="mypantry tabs"
          centered
        >
          <Tab
            label={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: '280px',
                }}
                spacing={1}
              >
                <Typography {...typographyProps}>
                  Nguyên liệu của tôi
                </Typography>
                <Typography {...labelIconProps}>
                  {pantryItems.length > 99 ? '99+' : pantryItems.length}
                </Typography>
              </Stack>
            }
          />
          <Tab
            label={
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: '280px',
                }}
                spacing={1}
              >
                <Typography {...typographyProps}>Công thức gợi ý</Typography>
                <Typography {...labelIconProps}>
                  {recommendRecipes?.length ?? 0}
                </Typography>
              </Stack>
            }
          />
        </Tabs>

        {/* Content */}
        <Box
          sx={{
            width: '100%',
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '48px',
            mb: 4,
            p: 2,
          }}
        >
          {/* Tủ lạnh */}
          <Box
            sx={{ width: '100%', display: tabValue == 0 ? 'block' : 'none' }}
          >
            <PantryContent
              pantryItems={pantryItems}
              hanlePantryItemsChange={hanlePantryItemsChange}
            />
          </Box>

          {/* Gợi ý */}
          <Box
            sx={{ width: '100%', display: tabValue == 1 ? 'block' : 'none' }}
          >
            <RecommendRecipe
              pantryItems={pantryItems}
              recommendRecipes={recommendRecipes}
              loadMoreButton={
                <Button
                  variant="contained"
                  onClick={loadMore}
                  disabled={end}
                  size="large"
                >
                  {end ? 'Đã hiển thị toàn bộ công thức phù hợp' : 'Xem thêm'}
                </Button>
              }
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default MyPantry;

const breadCrumbsLinks = [
  {
    href: PageRoute.Home,
    label: 'Tasteal',
  },
  {
    label: 'Tủ lạnh của tôi',
  },
];

const typographyProps: TypographyProps = {
  variant: 'h6',
  fontWeight: 'bold',
  textTransform: 'capitalize',
  color: 'inherit',
};

const labelIconProps: TypographyProps = {
  variant: 'caption',
  sx: {
    color: 'white',
    bgcolor: 'primary.main',
    borderRadius: 3,
    px: 1,
    fontWeight: 900,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '48px',
  },
};
