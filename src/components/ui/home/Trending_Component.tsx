import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import RecipeService from "@/lib/services/recipeService";
import { Suspense, useEffect, useState } from "react";
import { RecipesCarousel } from "./RecipesCarousel";
import { Skeleton } from "@mui/material";

const SkeletonTrending = () => (
  <Skeleton variant="rounded" height={372} width={"100%"} />
);

function Trending_Component() {
  const [trending, setTrending] = useState<RecipeEntity[] | undefined>(
    undefined
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTrending(await RecipeService.GetTrendingRecipes(10));
      } catch (error) {
        console.log(error);
        setTrending([]);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!trending && <SkeletonTrending />}

      {trending && (
        <Suspense fallback={<SkeletonTrending />}>
          <RecipesCarousel array={trending} />
        </Suspense>
      )}
    </>
  );
}

export default Trending_Component;
