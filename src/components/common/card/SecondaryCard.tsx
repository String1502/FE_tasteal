import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Box, CardActionArea, CardProps } from '@mui/material';
import CustomCard from './CustomCard';
import ImageRecipe from './ImageRecipe';
import NameRecipe from './NameRecipe';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';

function SecondaryCard({
  item,
  ...props
}: {
  props?: CardProps;
  item: RecipeEntity | IngredientEntity;
}) {
  return (
    <>
      <CustomCard {...props}>
        <CardActionArea>
          <ImageRecipe
            imgHeight={'148px'}
            src={item.image}
            alt={item.name}
            quality={1}
          />
        </CardActionArea>

        <Box sx={{ p: 1 }}>
          <NameRecipe centered={true} name={item.name} />
        </Box>
      </CustomCard>
    </>
  );
}

export default SecondaryCard;
