import { PrimaryCard } from '@/components/common/card/PrimaryCard';
import { CustomCarousel } from '@/components/common/carousel/CustomeCarousel';
import { cardWidth, responsive } from '@/lib/constants/responsiveCarousel';
import {
  ConvertReleatedRecipeResToRecipeEntity,
  RelatedRecipeRes,
} from '@/lib/models/dtos/Response/RelatedRecipeRes/RelatedRecipeRes';
import { Box, Typography } from '@mui/material';
import { FC } from 'react';

type SameAuthorRecipesCarouselProps = {
  recipes: RelatedRecipeRes[];
};

const SameAuthorRecipesCarousel: FC<SameAuthorRecipesCarouselProps> = ({
  recipes,
}) => {
  return (
    <>
      {recipes && recipes.length > 0 ? (
        <>
          <CustomCarousel
            responsive={responsive}
            removeArrowOnDeviceType={['sm', 'xs']}
          >
            {recipes.map((recipe) => (
              <Box
                key={recipe.id}
                sx={{
                  width: { xs: '96%', sm: cardWidth },
                  mt: 2,
                  mb: 4,
                  ml: 1.5,
                }}
              >
                <PrimaryCard
                  recipe={ConvertReleatedRecipeResToRecipeEntity(recipe)}
                />
              </Box>
            ))}
          </CustomCarousel>
        </>
      ) : (
        <>
          <Typography>There are no recipes from this author.</Typography>
        </>
      )}
    </>
  );
};

export default SameAuthorRecipesCarousel;
