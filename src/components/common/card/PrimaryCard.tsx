import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  Checkbox,
  Rating,
  Typography,
} from "@mui/material";
import {
  BookmarkBorderRounded,
  BookmarkRounded,
  StarRounded,
} from "@mui/icons-material";
import { RecipeEntity } from "../../../types/type";
import { curveShape, defaultAvt } from "@/assets/exportImage";
import { dateTimeToMinutes } from "@/utils/format";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";

const imgHeight = "224px";
const padding = 2;

export function PrimaryCard({
  recipe,
  ...props
}: {
  props?: CardProps;
  recipe: RecipeEntity;
}) {
  const image = useFirebaseImage(recipe?.image);
  const authorAvatar = useFirebaseImage(recipe?.Account?.avatar);
  return (
    <>
      <Box>
        <Card
          sx={{
            borderRadius: "16px",
            transition: "all 0.15s ease-in-out",
            cursor: "pointer",
            boxShadow: 2,
            position: "relative",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 12,
            },
            ...props.props?.sx,
          }}
        >
          <CardMedia
            component="img"
            height={imgHeight}
            // image="https://www.sidechef.com/recipe/d49b0c1d-e63e-4aac-afcc-b337b0cd1bff.jpg?d=1408x1120"
            image={image}
            alt={recipe.name}
          />
          <Checkbox
            size="small"
            sx={{
              position: "absolute",
              top: padding * 8,
              right: padding * 8,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              color: "#fff",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                transform: "scale(1.15)",
              },
            }}
            icon={<BookmarkBorderRounded sx={{ color: "#fff" }} />}
            checkedIcon={<BookmarkRounded sx={{ color: "#fff" }} />}
          />

          <Box
            sx={{
              position: "absolute",
              left: 0,
              width: "100%",
              top: imgHeight,
              zIndex: 1,
              px: padding,
              pb: 1,
              pt: 2,
              transform: "translateY(-99%)",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0))",
            }}
          >
            <Typography
              variant="body2"
              color="common.white"
              sx={{ fontWeight: "bold" }}
            >
              {dateTimeToMinutes(recipe.totalTime)} phút
            </Typography>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: padding * 8,
              top: imgHeight,
              width: "80px",
              height: "30px",
              zIndex: 2,
              transform: "translateY(-95%)",
              backgroundImage: `url(${curveShape})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          >
            <Avatar
              alt="Remy Sharp"
              src={authorAvatar}
              sx={{
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "80%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>

          <CardContent
            sx={{
              p: padding,
            }}
          >
            <Rating
              value={recipe.rating}
              precision={0.5}
              readOnly
              icon={<StarRounded fontSize="inherit" />}
              emptyIcon={<StarRounded fontSize="inherit" />}
              size="small"
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              {recipe.name}
            </Typography>

            <Button
              variant="outlined"
              sx={{
                borderRadius: "40px",
                mt: 2,
                width: "100%",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Thêm vào giỏ đi chợ
              </Typography>
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
