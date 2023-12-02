import BoxImage from "@/components/common/image/BoxImage";
import { Cart_ItemEntity } from "@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity";
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useState } from "react";

function CartItemCheckBox({
  item,
  total,
  handleChangeCartItemData,
}: {
  item: Cart_ItemEntity;
  total?: () => number;
  handleChangeCartItemData: (cartId: number, ingredientId: number) => void;
}) {
  const typoProps: TypographyProps = {
    variant: "body2",
    fontWeight: "light",
    sx: {
      width: "100%",
    },
  };

  const [isBought, setIsBought] = useState(item.isBought);

  return (
    <FormControlLabel
      sx={{
        width: "100%",
        py: 1,
        borderTop: 1,
        borderColor: "grey.300",
        ".MuiFormControlLabel-label": {
          width: "100%",
        },
        mx: 0,
      }}
      labelPlacement="start"
      control={
        <Checkbox
          checked={isBought}
          onChange={() => {
            setIsBought(!isBought);
            handleChangeCartItemData(item.cartId, item.ingredientId);
          }}
          icon={<RadioButtonUncheckedRounded />}
          checkedIcon={<CheckCircleRounded />}
        />
      }
      label={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            opacity: isBought ? 0.65 : 1,
          }}
        >
          <BoxImage
            src={item.ingredient?.image}
            sx={{
              height: "60px",
              aspectRatio: "1/1",
              objectFit: "contain",
              borderRadius: "50%",
              mr: 2,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              height: "fit-content",
            }}
          >
            <Typography {...typoProps}>{item.cart?.recipe?.name}</Typography>
            <Typography {...typoProps} fontWeight={900}>
              {item.ingredient?.name}
            </Typography>
            <Typography {...typoProps}>
              {Math.ceil(item.amount)}
              {total ? (
                <span style={{ color: "grey" }}> /{Math.ceil(total())}</span>
              ) : (
                ""
              )}
            </Typography>
          </Box>
        </Box>
      }
    />
  );
}

export default CartItemCheckBox;
