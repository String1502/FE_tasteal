import BoxImage from '@/components/common/image/BoxImage';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';

import { PersonalCartItemEntity } from '@/lib/models/entities/PersonalCartItemEntity/PersonalCartItemEntity';
import { MeasurementUnitResolver } from '@/lib/resolvers/measurement';
import CartItemService from '@/lib/services/CartItemService';
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  TypographyProps,
} from '@mui/material';
import { useCallback, useState } from 'react';

function CartItemCheckBox({
  item,
  total,
  type = 'cart',
  handleChangeCartItemData,
  handleChangePersonalCartItemData,
  shorten = false,
}: {
  item: Cart_ItemEntity;
  total?: () => number;
  type?: 'cart' | 'personal';
  handleChangeCartItemData?: (cartId: number, ingredientId: number) => void;
  handleChangePersonalCartItemData?: (
    id: PersonalCartItemEntity['id']
  ) => Promise<void>;
  shorten?: boolean;
}) {
  const typoProps: TypographyProps = {
    variant: 'body2',
    fontWeight: 'light',
    sx: {
      width: '100%',
    },
  };

  const [isBought, setIsBought] = useState<Cart_ItemEntity['isBought']>(
    item.isBought
  );

  const [snackbarAlert] = useSnackbarService();

  const updateCartItem = useCallback(
    async (
      cartID: CartEntity['id'],
      ingredientId: IngredientEntity['id'],
      isBought: Cart_ItemEntity['isBought']
    ) => {
      try {
        const result = await CartItemService.UpdateCartItem(
          cartID,
          ingredientId,
          isBought
        );
        if (result) {
          snackbarAlert('Cập nhật thành công!', 'success');
        } else snackbarAlert('Thao tác không thành công.', 'error');
      } catch (error) {
        console.log(error);
      }
    },
    [item, isBought]
  );

  return (
    <FormControlLabel
      sx={{
        width: '100%',
        py: 1,
        borderTop: shorten ? 0 : 1,
        borderColor: 'grey.300',
        '.MuiFormControlLabel-label': {
          width: '100%',
        },
        mx: 0,
        pr: 4,
      }}
      labelPlacement="start"
      control={
        <Checkbox
          checked={isBought}
          onChange={async () => {
            setIsBought(!isBought);
            if (type === 'cart' && handleChangeCartItemData) {
              handleChangeCartItemData(item.cartId, item.ingredient_id);
              await updateCartItem(item.cartId, item.ingredient_id, !isBought);
              return;
            }
            if (type === 'personal' && handleChangePersonalCartItemData) {
              await handleChangePersonalCartItemData(item.cartId);
            }
          }}
          icon={<RadioButtonUncheckedRounded />}
          checkedIcon={<CheckCircleRounded />}
        />
      }
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            opacity: isBought ? 0.65 : 1,
          }}
        >
          <BoxImage
            src={item.ingredient?.image}
            quality={1}
            sx={{
              height: '60px',
              width: '60px',
              objectFit: 'contain',
              borderRadius: '50%',
              mx: 2,
              display: shorten ? 'none' : 'block',
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              height: 'fit-content',
            }}
          >
            <Typography {...typoProps} fontWeight={900}>
              {shorten ? item.cart?.recipe?.name : item.ingredient?.name}
            </Typography>

            <Typography {...typoProps}>
              {shorten
                ? Math.ceil(item.amount) +
                  ' (' +
                  MeasurementUnitResolver(item.ingredient.isLiquid) +
                  ') '
                : item.cart?.recipe?.name}
            </Typography>

            <Typography {...typoProps} display={shorten ? 'none' : 'block'}>
              {total ? (
                <span style={{ color: 'grey' }}>
                  {Math.ceil(item.amount)} /{Math.ceil(total())}
                  {item?.ingredient.isLiquid ? ' (ml)' : ' (g)'}
                </span>
              ) : (
                ''
              )}
            </Typography>
          </Box>
        </Box>
      }
    />
  );
}

export default CartItemCheckBox;
