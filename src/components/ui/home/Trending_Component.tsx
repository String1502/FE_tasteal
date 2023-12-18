import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import RecipeService from '@/lib/services/recipeService';
import { Suspense, useEffect, useState } from 'react';
import { RecipesCarousel } from './RecipesCarousel';
import { CarouselPrimaryCardSkeleton } from './CarouselPrimaryCardSkeleton';

function Trending_Component() {
  const [trending, setTrending] = useState<RecipeEntity[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrending(await RecipeService.GetRecipeByRating(10));
      } catch (error) {
        console.log(error);
        setTrending([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!trending && <CarouselPrimaryCardSkeleton />}

      {trending && (
        <Suspense fallback={<CarouselPrimaryCardSkeleton />}>
          <RecipesCarousel array={trending} />
        </Suspense>
      )}
    </>
  );
}

export default Trending_Component;
