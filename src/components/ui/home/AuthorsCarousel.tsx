import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import BoxImage from '@/components/common/image/BoxImage';
import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import { AccountEntity } from '@/lib/models/entities/AccountEntity/AccountEntity';
import { Box, Typography } from '@mui/material';

const AuthorCard = ({ author }: { author: AccountEntity }) => {
    return (
        <>
            <Box
                sx={{
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        width: { xs: '100%', sm: cardWidth },
                        aspectRatio: '1/1.3',
                        borderRadius: 6,
                        boxShadow: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        mb: 2,
                    }}
                >
                    <BoxImage
                        src={author?.avatar ?? ''}
                        sx={{
                            transition: 'all 0.25s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.2) ',
                            },
                        }}
                    />
                </Box>
                <Typography
                    variant="body1"
                    fontWeight={'regular'}
                    fontStyle={'italic'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    textTransform={'uppercase'}
                    overflow={'hidden'}
                    width={'100%'}
                >
                    {!author.slogan || author.slogan == ''
                        ? 'TASTEAL AUTHOR'
                        : author.slogan}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={'bold'}
                    whiteSpace={'nowrap'}
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    width={'100%'}
                    sx={{
                        my: 1.5,
                    }}
                >
                    {!author.name || author.name == ''
                        ? 'Vô danh'
                        : author.name}
                </Typography>
                <Typography
                    variant="body2"
                    textOverflow={'ellipsis'}
                    overflow={'hidden'}
                    width={'100%'}
                    sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: '4',
                        WebkitBoxOrient: 'vertical',
                    }}
                >
                    {!author.introduction || author.introduction == ''
                        ? 'Nếu được chọn một lần nữa, có lẽ tôi vẫn chọn như vậy.'
                        : author.introduction}
                </Typography>
            </Box>
        </>
    );
};

export function AuthorsCarousel({ array }: { array: AccountEntity[] }) {
    return (
        <>
            {array && array.length > 0 ? (
                <CustomCarousel
                    responsive={responsive}
                    removeArrowOnDeviceType={['sm', 'xs']}
                >
                    {array.map((item, index) => (
                        <Box key={index}>
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
