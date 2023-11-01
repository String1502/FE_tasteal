import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { Clear, RotateLeftRounded, StarRounded } from "@mui/icons-material";
import { RecipeEntity } from "../../../../types/type";
import { curveShapePath } from "@/assets/exportImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";

const imgHeight = "148px";
const padding = 2;

export function MealPlanCard({
  recipe,
  ...props
}: {
  props?: CardProps;
  recipe: RecipeEntity;
}) {
  const curveShapeImg = useFirebaseImage(curveShapePath);
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
            image="https://www.sidechef.com/recipe/d49b0c1d-e63e-4aac-afcc-b337b0cd1bff.jpg?d=1408x1120"
            alt={recipe.name}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<RotateLeftRounded sx={{ color: "#fff" }} />}
            sx={{
              position: "absolute",
              top: padding * 8,
              left: padding * 8,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "#fff",
              },
              pr: 2,
              py: 0.4,
              fontWeight: "bold",
            }}
          >
            ĐỔI
          </Button>
          <IconButton
            color="primary"
            size="small"
            sx={{
              borderRadius: "50%",
              position: "absolute",
              top: padding * 8,
              right: padding * 8,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                color: "#fff",
              },
            }}
          >
            <Clear fontSize="small" />
          </IconButton>

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
              {recipe.totalTime} phút
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
              backgroundImage: `url(${curveShapeImg})`,
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
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
