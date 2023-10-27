import { PrimaryCard } from "@/components/common/card/PrimaryCard";
import { CustomCarousel } from "@/components/common/carousel/CustomeCarousel";
import { cardWidth, responsive } from "@/lib/constants/responsiveCarousel";
import { RecipeEntity } from "@/types/type";

export function RecipesCarousel({ array }: { array: RecipeEntity[] }) {
  return (
    <>
      <CustomCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["sm", "xs"]}
      >
        {array &&
          array.map((recipe) => (
            <PrimaryCard
              key={recipe.id}
              recipe={recipe}
              props={{
                sx: {
                  width: { xs: "96%", sm: cardWidth },
                  mt: 2,
                  mb: 4,
                },
              }}
            />
          ))}
      </CustomCarousel>
    </>
  );
}
