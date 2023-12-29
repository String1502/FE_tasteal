import BoxImage, { ImageQuality } from '../image/BoxImage';
import { CardMedia } from '@mui/material';

function ImageRecipe({
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

export default ImageRecipe;
