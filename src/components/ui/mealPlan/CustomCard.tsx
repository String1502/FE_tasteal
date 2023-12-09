import AvatarRecipe from '@/components/common/card/AvatarRecipe';
import CustomCard from '@/components/common/card/CustomCard';
import ImageRecipe from '@/components/common/card/ImageRecipe';
import NameRecipe from '@/components/common/card/NameRecipe';
import RatingRecipe from '@/components/common/card/RatingRecipe';
import TotalTimeRecipe from '@/components/common/card/TotalTimeRecipe';
import { PageRoute } from '@/lib/constants/common';
import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import {
    Button,
    CardActionArea,
    CardContent,
    CardProps,
    Typography,
} from '@mui/material';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const imgHeight = '124px';
const padding = 1.5;

function CustomCardMealPlan({
    recipe,
    ...props
}: {
    recipe: RecipeEntity;
    props?: CardProps;
}) {
    const navigate = useNavigate();

    const handleCardClick = useCallback(() => {
        navigate(PageRoute.Recipe.Detail(recipe.id));
    }, [navigate, recipe.id]);
    return (
        <>
            <CustomCard {...props}>
                <CardActionArea onClick={handleCardClick}>
                    <ImageRecipe
                        imgHeight={imgHeight}
                        src={recipe.image}
                        alt={recipe.name}
                        quality={80}
                    />
                    <TotalTimeRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        totalTime={recipe.totalTime}
                    />

                    <AvatarRecipe
                        imgHeight={imgHeight}
                        padding={padding}
                        quality={10}
                        account={recipe.account}
                    />
                </CardActionArea>

                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        position: 'absolute',
                        top: padding * 8,
                        right: padding * 8,
                        zIndex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            color: 'white',
                        },
                    }}
                    onClick={handleCardClick}
                >
                    <Typography
                        variant="caption"
                        sx={{ fontWeight: 'bold', color: 'white' }}
                    >
                        Xem
                    </Typography>
                </Button>

                <CardContent
                    sx={{
                        p: padding,
                    }}
                >
                    <RatingRecipe rating={recipe.rating} />

                    <NameRecipe name={recipe.name} />
                </CardContent>
            </CustomCard>
        </>
    );
}

export default CustomCardMealPlan;
