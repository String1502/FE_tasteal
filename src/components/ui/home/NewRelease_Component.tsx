import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import RecipeService from '@/lib/services/recipeService';
import { Suspense, useEffect, useState } from 'react';
import { RecipesCarousel } from './RecipesCarousel';
import { CarouselPrimaryCardSkeleton } from './CarouselPrimaryCardSkeleton';

export const NewRelease_Component: React.FunctionComponent = () => {
    const [newReleases, setNewReleases] = useState<RecipeEntity[] | undefined>(
        undefined
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                setNewReleases(await RecipeService.GetNewReleaseRecipes(10));
            } catch (error) {
                console.log(error);
                setNewReleases([]);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {!newReleases && <CarouselPrimaryCardSkeleton />}

            {newReleases && (
                <Suspense fallback={<CarouselPrimaryCardSkeleton />}>
                    <RecipesCarousel array={newReleases} />
                </Suspense>
            )}
        </>
    );
};
