import { CookBook } from '@/components/ui/mySaveRecipe/CookBook';
import { useMySavedRecipes } from '@/components/ui/mySaveRecipe/useMySavedRecipes';
import { MySavedRecipesContent } from '@/components/ui/mySaveRecipe/MySavedRecipesContent';
import { Box, Grid } from '@mui/material';
import CustomCardMealPlan from './CustomCard';
import { CustomDialog } from '../../common/dialog/CustomDialog';
import { AddYourFirstRecipe } from '../mySaveRecipe/AddYourFirstRecipe';
import { Plan_ItemEntity } from '@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity';
import { DateDisplay } from '@/pages/MealPlanner';

export function ModalThemTuBoSuuTap({
  open,
  handleClose,
  title,
  AddPlanItem,
  weekDates,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  AddPlanItem: (item: Plan_ItemEntity) => Promise<void>;
  weekDates: DateDisplay;
}) {
  const { cookbookData, choosing, handleChoosing } = useMySavedRecipes();

  return (
    <>
      <CustomDialog open={open} handleClose={handleClose} title={title}>
        <MySavedRecipesContent>
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              spacing={2}
              alignItems={'center'}
              justifyContent={'flex-start'}
            >
              {cookbookData.map((item, i) => (
                <Grid item xs={3.6} md={2} key={i}>
                  <CookBook
                    index={i}
                    cookbook={item}
                    choosing={choosing}
                    handleChoosing={handleChoosing}
                  />
                </Grid>
              ))}
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
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <CustomCardMealPlan
                      recipe={item.recipe}
                      AddPlanItem={AddPlanItem}
                      weekDates={weekDates}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>

          {choosing?.CookbookRecipes.length == 0 && <AddYourFirstRecipe />}
        </MySavedRecipesContent>
      </CustomDialog>
    </>
  );
}
