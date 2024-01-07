import Layout from '@/layout/Layout';
import { Box, Container, Grid, PaperProps } from '@mui/material';
import { CookBookEntity } from '@/lib/models/entities/CookBookEntity/CookBookEntity';
import { CookBook_RecipeEntity } from '@/lib/models/entities/CookBook_RecipeEntity/CookBook_RecipeEntity';
import { CookBook } from '../components/ui/mySaveRecipe/CookBook';
import { CustomCard } from '../components/ui/mySaveRecipe/CustomCard';
import { MySavedRecipesContent } from '../components/ui/mySaveRecipe/MySavedRecipesContent';
import { MySavedRecipesAction } from '../components/ui/mySaveRecipe/MySavedRecipesAction';
import { AddYourFirstRecipe } from '../components/ui/mySaveRecipe/AddYourFirstRecipe';
import { useMySavedRecipes } from '../components/ui/mySaveRecipe/useMySavedRecipes';
import AddNewCookBook from '@/components/ui/mySaveRecipe/AddNewCookBook';

export type CookbookChoosingType = {
  Cookbook: CookBookEntity;
  CookbookRecipes: CookBook_RecipeEntity[];
};

export const DialogPaperProps: PaperProps = {
  sx: {
    borderRadius: 4,
    p: 2,
    pt: 1,
  },
};

function MySavedRecipes() {
  const {
    cookbookData,
    choosing,
    handleChoosing,
    handleChangeCookbook,
    handleChangeRecipeInCookbook,
  } = useMySavedRecipes();

  return (
    <Layout withFooter={false} headerPosition="static" isDynamicHeader={false}>
      <Container>
        <MySavedRecipesContent>
          <MySavedRecipesAction />

          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              {cookbookData &&
                cookbookData.map((item, i) => (
                  <Grid item xs={3.6} md={2.4} lg={1.2} key={i}>
                    <CookBook
                      cookbook={item}
                      choosing={choosing}
                      handleChoosing={handleChoosing}
                      handleChangeCookbook={handleChangeCookbook}
                      index={i}
                    />
                  </Grid>
                ))}

              <Grid item xs={3.6} md={2.4} lg={1.2}>
                <AddNewCookBook handleChangeCookbook={handleChangeCookbook} />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              width: '100%',
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
            >
              {choosing?.CookbookRecipes.length > 0 &&
                choosing?.CookbookRecipes.map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                    <CustomCard
                      cookbookRecipe={item}
                      cookbookData={cookbookData}
                      handleChangeRecipeInCookbook={
                        handleChangeRecipeInCookbook
                      }
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>

          <Box
            sx={{
              display: choosing?.CookbookRecipes.length == 0 ? 'flex' : 'none',
              justifyContent: 'center',
            }}
          >
            <AddYourFirstRecipe />
          </Box>
        </MySavedRecipesContent>
      </Container>
    </Layout>
  );
}

export default MySavedRecipes;
