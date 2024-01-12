import AvatarRecipe from '@/components/common/card/AvatarRecipe';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import RatingRecipe from '@/components/common/card/RatingRecipe';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';
import { PageRoute } from '@/lib/constants/common';
import AppContext from '@/lib/contexts/AppContext';
import { Plan_ItemEntity } from '@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { DateDisplay } from '@/pages/MealPlanner';
import {
  Button,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
} from '@mui/material';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const imgHeight = '124px';
const padding = 1.5;

function CustomCardMealPlan({
  recipe,
  AddPlanItem,
  weekDates,
  ...props
}: {
  recipe: RecipeEntity;
  AddPlanItem: (item: Plan_ItemEntity) => Promise<void>;
  weekDates: DateDisplay;
  props?: CardProps;
}) {
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(PageRoute.Recipe.Detail(recipe.id));
  }, [navigate, recipe.id]);

  const { login } = useContext(AppContext);

  return (
    <>
      <CustomCard {...props}>
        <CardActionArea
          onClick={async () => {
            if (!login.user || !login.user?.uid) {
              return;
            } else {
              const data: Plan_ItemEntity = {
                id: uuidv4(),
                plan_id: -1,
                recipe_id: recipe.id,
                serving_size: recipe.serving_size,
                order: -1,
                recipe: recipe,
                plan: {
                  id: -1,
                  account_id: login.user.uid,
                  date: weekDates.date,
                },
              };

              await AddPlanItem(data);
            }
          }}
        >
          <ImageRecipe
            imgHeight={imgHeight}
            src={recipe.image}
            alt={recipe.name}
            quality={10}
          />
          <TotalTimeRecipe
            imgHeight={imgHeight}
            padding={padding}
            totalTime={recipe.totalTime}
          />

          <AvatarRecipe
            imgHeight={imgHeight}
            padding={padding}
            quality={1}
            account={recipe.account}
          />
        </CardActionArea>

        <Button
          variant="contained"
          size="small"
          sx={{
            position: 'absolute',
            top: padding * 8,
            right: padding * 8,
            zIndex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              color: 'white',
            },
          }}
          onClick={handleCardClick}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            Xem
          </Typography>
        </Button>

        <CardContent
          sx={{
            p: padding,
          }}
        >
          <RatingRecipe rating={recipe.rating} />

          <NameRecipe name={recipe.name} />
        </CardContent>
      </CustomCard>
    </>
  );
}

export default CustomCardMealPlan;
