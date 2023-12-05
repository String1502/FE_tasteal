import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export function CustomCarousel({
    children,
    responsive,
    removeArrowOnDeviceType,
}: {
    responsive: ResponsiveType;
    children: React.ReactNode;
    removeArrowOnDeviceType: string[];
}) {
    return (
        <>
            <Carousel
                additionalTransfrom={0}
                autoPlaySpeed={3000}
                draggable
                focusOnSelect={false}
                minimumTouchDrag={80}
                pauseOnHover
                removeArrowOnDeviceType={removeArrowOnDeviceType}
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                swipeable
                ssr
            >
                {children}
            </Carousel>
        </>
    );
}
