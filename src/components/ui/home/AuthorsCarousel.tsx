import { CustomCarousel } from "@/components/common/carousel/CustomeCarousel";
import { cardWidth, responsive } from "@/lib/constants/responsiveCarousel";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { AccountEntity } from "@/types/type";
import { Box, Typography } from "@mui/material";

const AuthorCard = ({ author }: { author: AccountEntity }) => {
  const avatar = useFirebaseImage(author?.avatar);
  console.log(avatar);

  return (
    <>
      <Box
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
            src={avatar ?? ""}
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
        {array.map((item, index) => (
          <Box key={index}>
            <AuthorCard author={item} />
          </Box>
        ))}
      </CustomCarousel>
    </>
  );
}
