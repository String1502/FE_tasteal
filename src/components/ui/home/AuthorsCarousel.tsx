import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Box, Typography } from '@mui/material';
import { AuthorCard } from './AuthorCard';

export function AuthorsCarousel({ array }: { array: AccountEntity[] }) {
    return (
        <>
            {array && array.length > 0 ? (
                <CustomCarousel
                    responsive={responsive}
                    removeArrowOnDeviceType={['sm', 'xs']}
                >
                    {array.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                p: 2,
                                width: { xs: '100%', sm: cardWidth },
                            }}
                        >
                            <AuthorCard author={item} />
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
                        variant="h3"
                        fontWeight={'bold'}
                        fontFamily={'Dancing Script'}
                    >
                        Chưa có tác giả nào :(
                    </Typography>
                </Box>
            )}
        </>
    );
}
