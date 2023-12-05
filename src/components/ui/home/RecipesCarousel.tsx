import { PrimaryCard } from '@/components/common/card/PrimaryCard';
import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import { Box, Typography } from '@mui/material';

export function RecipesCarousel({ array }: { array: RecipeEntity[] }) {
    return (
        <>
            {array && array.length > 0 ? (
                <CustomCarousel
                    responsive={responsive}
                    removeArrowOnDeviceType={['sm', 'xs']}
                >
                    {array.map((recipe) => (
                        <Box
                            key={recipe.id}
                            sx={{
                                width: { xs: '96%', sm: cardWidth },
                                mt: 2,
                                mb: 4,
                                ml: 1.5,
                            }}
                        >
                            <PrimaryCard recipe={recipe} />
                        </Box>
                    ))}
                </CustomCarousel>
            ) : (
                <Box
                    sx={{
                        width: '100%',
                        height: '200px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        color={'gray.main'}
                        variant="h2"
                        fontWeight={'bold'}
                        fontFamily={'Dancing Script'}
                    >
                        Chưa có công thức nào :(
                    </Typography>
                </Box>
            )}
        </>
    );
}
