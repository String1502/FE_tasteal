import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { PrimaryCardSkeleton } from './PrimaryCardSkeleton';

export const CarouselPrimaryCardSkeleton = ({
  length = 16,
}: {
  length?: number;
}) => {
  const itemsPerRow = 4;

  return (
 
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px', // Khoảng cách giữa các thẻ
          justifyContent: 'space-between',
        }}
      >
        {Array.from({ length: length }, (_, i) => i).map((_, i) => (
          <PrimaryCardSkeleton
            key={i}
            sx={{
             width: { xs: '100%', sm: `calc(${cardWidth} - 16px)` }, // Trừ đi khoảng cách giữa các thẻ để đảm bảo vừa vặn
              height:280,
              borderRadius: '16px',
              marginBottom: '16px',
              flexBasis: `calc(25% - 16px)`, // Đảm bảo mỗi hàng chứa đúng 4 thẻ
              boxSizing: 'border-box',
            }}
          />
        ))}
      </div>
  );
};
