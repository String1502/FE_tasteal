import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import BoxImage, { ImageQuality } from '../image/BoxImage';
import { CardMedia } from '@mui/material';

function ImageRecipe({
    recipe,
    imgHeight,
    quality,
}: {
    recipe?: RecipeEntity;
    imgHeight: string | number;
    quality?: ImageQuality;
}) {
    return (
        <CardMedia sx={{ height: imgHeight }}>
            <BoxImage
                src={recipe?.image}
                alt={recipe?.name}
                quality={quality}
                sx={{
                    height: imgHeight,
                    width: '100%',
                }}
            />
        </CardMedia>
    );
}

export default ImageRecipe;
