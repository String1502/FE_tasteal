import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { StarRounded } from '@mui/icons-material';
import { Rating } from '@mui/material';

function RatingRecipe({ rating }: { rating: RecipeEntity['rating'] }) {
    return (
        <Rating
            value={rating}
            precision={0.5}
            readOnly
            icon={<StarRounded fontSize="inherit" />}
            emptyIcon={<StarRounded fontSize="inherit" />}
            size="small"
        />
    );
}

export default RatingRecipe;
