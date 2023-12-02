import RecipeService from "@/lib/services/recipeService";
import { Skeleton } from "@mui/material";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import { useState, useEffect, Suspense } from "react";
import { RecipesCarousel } from "./RecipesCarousel";

const SkeletonNewRelease = () => (
  <Skeleton variant="rounded" height={372} width={"100%"} />
);

export function NewRelease_Component() {
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
}
