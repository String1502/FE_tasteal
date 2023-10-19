import { PrimaryCard } from "@/components/common/card/PrimaryCard";
import { CustomCarousel } from "@/components/common/carousel/CustomeCarousel";
import { RecipeEntity } from "@/types/type";

const cardWidth = 264; //px
const spacing = 24; //px
const lg = 4;
const md = 3;
const sm = 2;
const xs = 1;

const breakpoints = {
  lg: {
    max: 3000,
    min: cardWidth * lg + spacing * (lg - 1),
  },
  md: {
    max: cardWidth * lg + spacing * (lg - 1),
    min: cardWidth * md + spacing * md,
  },
  sm: {
    max: cardWidth * md + spacing * md,
    min: cardWidth * sm + spacing * (sm + 1),
  },
  xs: {
    max: cardWidth * sm + spacing * (sm + 1),
    min: 0,
  },
};

const responsive = {
  lg: {
    breakpoint: {
      max: breakpoints.lg.max,
      min: breakpoints.lg.min,
    },
    items: lg,
    slidesToSlide: lg,
    partialVisibilityGutter: 30,
  },
  md: {
    breakpoint: {
      max: breakpoints.md.max,
      min: breakpoints.md.min,
    },
    items: md,
    slidesToSlide: md,
    partialVisibilityGutter: 30,
  },
  sm: {
    breakpoint: {
      max: breakpoints.sm.max,
      min: breakpoints.sm.min,
    },
    items: sm,
    slidesToSlide: sm,
    partialVisibilityGutter: 30,
  },
  xs: {
    breakpoint: {
      max: breakpoints.xs.max,
      min: breakpoints.xs.min,
    },
    items: xs,
    slidesToSlide: xs,
    partialVisibilityGutter: 30,
  },
};

export function RecipesCarousel({ array }: { array: RecipeEntity[] }) {
  return (
    <>
      <CustomCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["sm", "xs"]}
      >
        {array.map((recipe) => (
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
