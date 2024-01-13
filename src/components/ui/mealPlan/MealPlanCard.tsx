import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  CardProps,
  IconButton,
} from '@mui/material';
import { Clear, RotateLeftRounded } from '@mui/icons-material';
import { Draggable } from 'react-beautiful-dnd';
import { Plan_ItemEntity } from '@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { imgHeight, padding } from '@/components/common/card/PrimaryCard';
import CustomCard from '@/components/common/card/CustomCard';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';
import AvatarRecipe from '@/components/common/card/AvatarRecipe';
import RatingRecipe from '@/components/common/card/RatingRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import ImageRecipe from '@/components/common/card/ImageRecipe';

export function MealPlanCard({
  index,
  planItem,
  recipe,
  handleRemovePlanItem,
  ...props
}: {
  index: number;
  planItem: Plan_ItemEntity;
  recipe: RecipeEntity;
  handleRemovePlanItem: (id: number) => void;
  props?: CardProps;
}) {
  return (
    <>
      <Draggable
        draggableId={planItem.id.toString()}
        index={index}
        key={planItem.id.toString()}
      >
        {(provided, _snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            sx={{
              width: '100%',
            }}
          >
            <CustomCard {...props}>
              <CardActionArea>
                <ImageRecipe
                  imgHeight={imgHeight}
                  src={recipe.image}
                  alt={recipe.name}
                  quality={80}
                />

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<RotateLeftRounded sx={{ color: '#fff' }} />}
                  sx={{
                    position: 'absolute',
                    top: padding * 8,
                    left: padding * 8,
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    transition: 'all 0.1s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      color: '#fff',
                    },
                    pr: 2,
                    py: 0.4,
                    fontWeight: 'bold',
                  }}
                >
                  ĐỔI
                </Button>

                <IconButton
                  color="primary"
                  size="small"
                  sx={{
                    borderRadius: '50%',
                    position: 'absolute',
                    top: padding * 8,
                    right: padding * 8,
                    zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#fff',
                    transition: 'all 0.1s ease-in-out',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                      color: '#fff',
                    },
                  }}
                  onClick={() => handleRemovePlanItem(planItem.id)}
                >
                  <Clear fontSize="small" />
                </IconButton>

                <TotalTimeRecipe
                  imgHeight={imgHeight}
                  padding={padding}
                  totalTime={recipe.totalTime}
                />

                <AvatarRecipe
                  imgHeight={imgHeight}
                  padding={padding}
                  account={recipe.account}
                />
              </CardActionArea>

              <CardContent
                sx={{
                  p: padding,
                }}
              >
                <RatingRecipe rating={recipe.rating} />
                <NameRecipe name={recipe.name} />
              </CardContent>
            </CustomCard>
          </Box>
        )}
      </Draggable>
    </>
  );
}
