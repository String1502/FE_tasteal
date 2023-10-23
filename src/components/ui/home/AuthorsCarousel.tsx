import { CustomCarousel } from "@/components/common/carousel/CustomeCarousel";
import { AccountEntity } from "@/types/type";
import { Box, Typography } from "@mui/material";

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

const AuthorCard = ({ author }: { author: AccountEntity }) => {
  return (
    <>
      <Box
        key={author.id}
        sx={{
          p: 2,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: cardWidth },
            aspectRatio: "1/1.4",
            borderRadius: 6,
            boxShadow: 1,
            position: "relative",
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Box
            component={"img"}
            src={author.avatar ?? ""}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              position: "relative",
              transition: "all 0.25s ease-in-out",
              "&:hover": {
                transform: "scale(1.2) ",
              },
            }}
          />
        </Box>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          width={"100%"}
        >
          {author.name}
        </Typography>
        <Typography
          variant="body2"
          textOverflow={"ellipsis"}
          overflow={"hidden"}
          width={"100%"}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: "4",
            WebkitBoxOrient: "vertical",
          }}
        >
          {author.introduction}
        </Typography>
      </Box>
    </>
  );
};

export function AuthorsCarousel({ array }: { array: AccountEntity[] }) {
  return (
    <>
      <CustomCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["sm", "xs"]}
      >
        {array.map((item) => (
          <AuthorCard key={item.id} author={item} />
        ))}
      </CustomCarousel>
    </>
  );
}
