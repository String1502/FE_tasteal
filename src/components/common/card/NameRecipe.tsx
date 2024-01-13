import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Typography } from '@mui/material';

function NameRecipe({
  name,
  centered = false,
}: {
  name: RecipeEntity['name'];
  centered?: boolean;
}) {
  return (
    <Typography
      variant="body2"
      sx={{ fontWeight: 'bold', width: '100%' }}
      whiteSpace={'nowrap'}
      textOverflow={'ellipsis'}
      overflow={'hidden'}
      textAlign={centered ? 'center' : 'left'}
    >
      {name}
    </Typography>
  );
}

export default NameRecipe;
