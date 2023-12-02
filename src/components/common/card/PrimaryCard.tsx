import { curveShapePath } from "@/assets/exportImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import { CookBookEntity } from "@/lib/models/entities/CookBookEntity/CookBookEntity";
import { RecipeEntity } from "@/lib/models/entities/RecipeEntity/RecipeEntity";
import AccountService from "@/lib/services/accountService";
import CookbookService from "@/lib/services/cookbookService";
import { dateTimeToMinutes } from "@/utils/format";
import {
  ArrowRightRounded,
  BookmarkBorderRounded,
  BookmarkRounded,
  PlayArrowRounded,
  StarRounded,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  Checkbox,
  CheckboxProps,
  ListItemIcon,
  Menu,
  MenuItem,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { Suspense, useEffect, useState } from "react";

const imgHeight = "224px";
const padding = 2;

export function PrimaryCard({
  recipe,
  saveCheckBoxProps,
  ...props
}: {
  props?: CardProps;
  saveCheckBoxProps?: CheckboxProps;
  recipe: RecipeEntity;
}) {
  const image = useFirebaseImage(recipe?.image ?? "");
  const authorAvatar = useFirebaseImage(recipe.account?.avatar ?? "");
  const curveShapeImg = useFirebaseImage(curveShapePath);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [Cookbooks, setCookbooks] = useState<CookBookEntity[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const account = await AccountService.GetByUid("1");
        const cookbooks = await CookbookService.GetCookbooksByAccountId(
          account.uid
        );
        setCookbooks(cookbooks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
            loading="lazy"
            sx={{
              opacity: 0,
              transition: "all 0.2s ease-in-out",
            }}
            onLoad={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
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
            onClick={(e: any) => {
              e.preventDefault();
              handleClick(e);
            }}
            {...saveCheckBoxProps}
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
                opacity: 0,
                transition: "all 0.2s ease-in-out",
              }}
              onLoad={(e) => {
                e.currentTarget.style.opacity = "1";
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

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              background: "white",
              borderRadius: 4,
              width: "200px",
            },
          },
        }}
      >
        {Cookbooks.map((cookbook) => {
          return (
            <MenuItem key={cookbook.id} onClick={handleClose}>
              <ListItemIcon>
                <PlayArrowRounded color="primary" fontSize="small" />
              </ListItemIcon>
              <Typography
                variant="body2"
                color="primary"
                fontWeight={"bold"}
                whiteSpace={"nowrap"}
                textOverflow={"ellipsis"}
                overflow={"hidden"}
              >
                {cookbook.name}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
