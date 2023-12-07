import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { RecipeServingSizeCard } from './RecipeServingSizeCard';
import { Box } from '@mui/material';

export function RecipesServingSizeCarousel({
    array,
    handleServingSizeChange,
}: {
    array: CartEntity[];
    handleServingSizeChange: (cartId: number, newValue: number) => void;
}) {
    return (
        <>
            {array.length > 0 && (
                <CustomCarousel
                    responsive={responsive}
                    removeArrowOnDeviceType={['sm', 'xs']}
                >
                    {array.map((item) => (
                        <RecipeServingSizeCard
                            key={item.id}
                            cart={item}
                            handleServingSizeChange={handleServingSizeChange}
                            props={{
                                sx: {
                                    width: { xs: '96%', sm: cardWidth },
                                    mt: 2,
                                    mb: 4,
                                },
                            }}
                        />
                    ))}
                </CustomCarousel>
            )}
            {array.length === 0 && (
                <>
                    <Box
                        sx={{
                            mt: 2,
                            mb: 4,
                        }}
                    />
                </>
            )}
        </>
    );
}
