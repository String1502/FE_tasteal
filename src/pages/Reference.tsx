import TastealBreadCrumbs from '@/components/common/breadcrumbs/TastealBreadcrumbs';
import BoxStickyScroll from '@/components/common/scroll/BoxStickyScroll';
import IngredientTypeContent from '@/components/ui/reference/IngredientTypeContent';
import IngredientTypeMenu from '@/components/ui/reference/IngredientTypeMenu';
import OccasionContent from '@/components/ui/reference/OccasionContent';
import Layout from '@/layout/Layout';
import { PageRoute } from '@/lib/constants/common';
import { Ingredient_TypeEntity } from '@/lib/models/entities/Ingredient_TypeEntity/Ingredient_TypeEntity';
import { OccasionEntity } from '@/lib/models/entities/OccasionEntity/OccasionEntity';
import OccasionService from '@/lib/services/occasionService';
import { CelebrationRounded, SpaRounded } from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const breadCrumbsLinks = [
  {
    href: PageRoute.Home,
    label: 'Tasteal',
  },
  {
    label: 'Nguyên liệu và dịp lễ',
  },
];
function Reference() {
  // Tab value
  const [tabValue, setTabValue] = useState('ingredients');
  const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  // Loại nguyên liệu
  const [watchingId, setWatchingId] = useState<Ingredient_TypeEntity['id']>(-1);
  const handleChangeWatchingId = (id: Ingredient_TypeEntity['id']) => {
    setWatchingId(id);
  };

  // Lễ
  const [occasions, setOccasions] = useState<OccasionEntity[]>([]);
  console.log(occasions);

  useEffect(() => {
    async function get() {
      try {
        const data = await OccasionService.GetAll();
        setOccasions(
          data.map((item) => {
            const start_at = new Date(item.start_at);
            if (item.id == 10) {
              start_at.setFullYear(new Date().getFullYear() - 1);
            } else {
              start_at.setFullYear(new Date().getFullYear());
            }
            const end_at = new Date(item.end_at);
            end_at.setFullYear(new Date().getFullYear());
            return {
              ...item,
              start_at: start_at,
              end_at: end_at,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  const { type, id } = useParams();
  useEffect(() => {
    if (type) {
      if (id && id != '') {
        setWatchingId(Number(id));
      }
      setTabValue(type);
    }
  }, [type]);

  return (
    <Layout headerPosition="static" isDynamicHeader={false}>
      <Container>
        <Box sx={{ mt: 4, mb: 2 }}>
          <TastealBreadCrumbs links={breadCrumbsLinks} />
        </Box>

        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            mb: 4,
          }}
        >
          <Tab
            value="ingredients"
            icon={<SpaRounded />}
            label={
              <Typography
                variant="h6"
                fontWeight={'bold'}
                textTransform={'capitalize'}
                color={'inherit'}
                sx={{
                  width: '200px',
                }}
              >
                Nguyên liệu
              </Typography>
            }
          />
          <Tab
            value="occasions"
            icon={<CelebrationRounded />}
            label={
              <Typography
                variant="h6"
                fontWeight={'bold'}
                textTransform={'capitalize'}
                color={'inherit'}
                sx={{
                  width: '200px',
                }}
              >
                Dịp lễ hội
              </Typography>
            }
          />
        </Tabs>

        {tabValue == 'ingredients' ? (
          <Grid
            container
            spacing={2}
            sx={{
              mb: 8,
              minHeight: 'calc(100vh - 200px)',
            }}
          >
            {/* Ingredient Menu */}
            <Grid item xs={3}>
              <BoxStickyScroll top={32}>
                <Slide
                  direction="right"
                  in={tabValue == 'ingredients'}
                  mountOnEnter
                  unmountOnExit
                >
                  <Box>
                    <IngredientTypeMenu
                      watchingId={watchingId}
                      handleChangeWatchingId={handleChangeWatchingId}
                    />
                  </Box>
                </Slide>
              </BoxStickyScroll>
            </Grid>

            {/* Ingredient Content */}
            <Grid item xs={9}>
              <Slide
                direction="left"
                in={tabValue == 'ingredients'}
                mountOnEnter
                unmountOnExit
              >
                <Box>
                  <IngredientTypeContent watchingId={watchingId} />
                </Box>
              </Slide>
            </Grid>
          </Grid>
        ) : (
          <Slide
            direction="up"
            in={tabValue == 'occasions'}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                mb: 8,
              }}
            >
              <OccasionContent occasions={occasions} />
            </Box>
          </Slide>
        )}
      </Container>
    </Layout>
  );
}

export default Reference;
