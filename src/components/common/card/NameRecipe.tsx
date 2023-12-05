import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Typography } from '@mui/material';

function NameRecipe({ name }: { name: RecipeEntity['name'] }) {
    return (
        <Typography
            variant="body2"
            sx={{ fontWeight: 'bold' }}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            overflow={'hidden'}
        >
            {name}
        </Typography>
    );
}

export default NameRecipe;
