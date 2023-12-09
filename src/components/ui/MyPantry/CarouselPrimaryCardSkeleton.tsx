import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { PrimaryCardSkeleton } from './PrimaryCardSkeleton';

export const CarouselPrimaryCardSkeleton = ({
    length = 5,
}: {
    length?: number;
}) => (
    <CustomCarousel
        responsive={responsive}
        removeArrowOnDeviceType={['sm', 'xs']}
    >
        {Array.from({ length: length }, (_, i) => i).map((_, i) => (
            <PrimaryCardSkeleton
                key={i}
                sx={{
                    width: { xs: '96%', sm: cardWidth },
                    height: 372,
                    mt: 2,
                    mb: 4,
                    borderRadius: '16px',
                }}
            />
        ))}
    </CustomCarousel>
);
