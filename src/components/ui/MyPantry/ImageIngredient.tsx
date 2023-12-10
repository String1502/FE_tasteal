import BoxImage, { ImageQuality } from '../../common/image/BoxImage';
import { CardMedia } from '@mui/material';

function ImageIngredient({
    src,
    alt,
    imgHeight,
    quality,
}: {
    src: string;
    alt: string;
    imgHeight: string | number;
    quality?: ImageQuality;
}) {
    return (
        <CardMedia sx={{ height: imgHeight }}>
            <BoxImage
                src={src}
                alt={alt}
                quality={quality}
                sx={{
                    height: imgHeight,
                    width: '100%',
                }}
            />
        </CardMedia>
    );
}

export default ImageIngredient;
