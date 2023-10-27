import { CustomCarousel } from "@/components/common/carousel/CustomeCarousel";
import { SERVING_SIZES } from "@/lib/constants/options";
import { cardWidth, responsive } from "@/lib/constants/responsiveCarousel";
import { CartEntity } from "@/types/type";
import { CloseRounded, PeopleRounded } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CardProps,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const SecondaryCard = ({
  cart,
  handleServingSizeChange,
  ...props
}: {
  cart: CartEntity;
  handleServingSizeChange: (cartId: number, newValue: number) => void;
  props?: CardProps;
}) => {
  const imgHeight = "132px";
  const padding = 2;
  const [servingSize, setServingSize] = useState(cart.serving_size);

  useEffect(() => {
    if (cart.serving_size) {
      setServingSize(cart.serving_size);
    }
  }, [cart.serving_size]);

  useEffect(() => {
    handleServingSizeChange(cart.id, servingSize);
  }, [servingSize]);

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
            alt={cart.Recipe?.name}
          />
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: padding * 4,
              right: padding * 4,
              zIndex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              transition: "all 0.1s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                color: "#fff",
                transform: "scale(1.05)",
              },
            }}
          >
            <CloseRounded sx={{ color: "#fff" }} fontSize="inherit" />
          </IconButton>

          <TextField
            sx={{
              position: "absolute",
              top: padding * 4,
              left: padding * 8,
              zIndex: 1,
              "& fieldset": { border: "none" },
              ".MuiSelect-select": {
                px: 0,
                py: 0.2,
              },
              ".MuiSvgIcon-root": {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleRounded
                    sx={{
                      color: "white",
                      fontSize: "16px",
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "16px",
                px: 1,
                py: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              },
            }}
            select
            value={servingSize}
            onChange={(e) => setServingSize(parseInt(e.target.value))}
          >
            {SERVING_SIZES.map((item) => (
              <MenuItem key={item} value={item} color="primary">
                <Typography variant="caption" color={"inherit"}>
                  {item}
                </Typography>
              </MenuItem>
            ))}
          </TextField>

          <CardContent
            sx={{
              p: padding,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              {cart.Recipe?.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export function RecipesServingSizeCarousel({
  array,
  handleServingSizeChange,
}: {
  array: CartEntity[];
  handleServingSizeChange: (cartId: number, newValue: number) => void;
}) {
  return (
    <>
      <CustomCarousel
        responsive={responsive}
        removeArrowOnDeviceType={["sm", "xs"]}
      >
        {array.map((item) => (
          <SecondaryCard
            key={item.id}
            cart={item}
            handleServingSizeChange={handleServingSizeChange}
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
