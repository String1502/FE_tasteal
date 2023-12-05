import { Box, Grid, Typography } from '@mui/material';
import {
    mealPlanImagePath,
    orderWhatYouNeedImagePath,
    recipesOccasionsImagePath,
    saveRecipesImagePath,
} from '@/assets/exportImage';
import BoxImage from '@/components/common/image/BoxImage';

const whyTastealArray = [
    {
        title: 'Công cụ lịch ăn miễn phí',
        image: mealPlanImagePath,
    },
    {
        title: 'Tất cả công thức bạn yêu thích',
        image: saveRecipesImagePath,
    },
    {
        title: 'Thực đơn theo dịp đặc biệt',
        image: recipesOccasionsImagePath,
    },
    {
        title: 'Chỉ mua những thứ cần thiết',
        image: orderWhatYouNeedImagePath,
    },
];

export function WhyTasteal() {
    return (
        <>
            {whyTastealArray.map((item, index) => {
                return (
                    <Grid
                        key={index}
                        item
                        xs={6}
                        md={3}
                    >
                        <WhyTastealItem item={item} />
                    </Grid>
                );
            })}
        </>
    );
}

const WhyTastealItem = ({
    item,
}: {
    item: { title: string; image: string };
}) => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    display: 'flex',
                }}
            >
                <BoxImage
                    src={item.image}
                    quality={30}
                    alt={item.title}
                    sx={{
                        width: '20%',
                        aspectRatio: '1/1',
                        objectFit: 'contain',
                        mb: 2,
                    }}
                />
                <Typography
                    variant="body2"
                    fontWeight={'bold'}
                    sx={{
                        textAlign: 'center',
                        textTransform: 'Capitalize',
                    }}
                >
                    {item.title}
                </Typography>
            </Box>
        </>
    );
};
