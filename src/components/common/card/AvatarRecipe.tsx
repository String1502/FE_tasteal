import { Box } from '@mui/material';
import BoxImage, { ImageQuality } from '../image/BoxImage';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { curveShapePath } from '@/assets/exportImage';
import useFirebaseImage from '@/lib/hooks/useFirebaseImage';

function AvatarRecipe({
    imgHeight,
    padding,
    quality,
    account,
}: {
    imgHeight: string | number;
    padding: number;
    quality?: ImageQuality;
    account?: AccountEntity;
}) {
    const curveShapeImg = useFirebaseImage(curveShapePath);

    return (
        <Box
            sx={{
                position: 'absolute',
                right: padding * 8,
                top: imgHeight,
                width: '80px',
                height: '30px',
                zIndex: 2,
                transform: 'translateY(-95%)',
                backgroundImage: `url(${curveShapeImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
            }}
        >
            <BoxImage
                src={account?.avatar}
                alt={account?.name}
                quality={quality}
                sx={{
                    width: '40px',
                    height: '40px',
                    position: 'absolute',
                    top: '80%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '50%',
                }}
            />
        </Box>
    );
}

export default AvatarRecipe;
