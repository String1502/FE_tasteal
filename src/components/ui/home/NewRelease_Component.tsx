import { RecipeEntity } from '@/lib/models/entities/RecipeEntity/RecipeEntity';
import RecipeService from '@/lib/services/recipeService';
import { Skeleton } from '@mui/material';
import { Suspense, useEffect, useState } from 'react';
import { RecipesCarousel } from './RecipesCarousel';

// TODO: CQ please move this to another file so `Fast refresh` can work.
const SkeletonNewRelease = () => (
    <Skeleton
        variant="rounded"
        height={372}
        width={'100%'}
    />
);

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
            {!newReleases && <SkeletonNewRelease />}

            {newReleases && (
                <Suspense fallback={<SkeletonNewRelease />}>
                    <RecipesCarousel array={newReleases} />
                </Suspense>
            )}
        </>
    );
};
