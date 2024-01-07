import BoxImage from '@/components/common/image/BoxImage';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import { CartEntity } from '@/lib/models/entities/CartEntity/CartEntity';
import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { IngredientEntity } from '@/lib/models/entities/IngredientEntity/IngredientEntity';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import { PersonalCartItemEntity } from '@/lib/models/entities/PersonalCartItemEntity/PersonalCartItemEntity';
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
import { useCallback, useMemo, useState } from 'react';

function CartItemCheckBox({
  item,
  total,
  type = 'cart',
  handleChangeCartItemData,
  handleChangePersonalCartItemData,
  pantryItems,
}: {
  item: Cart_ItemEntity;
  total?: () => number;
  type?: 'cart' | 'personal';
  handleChangeCartItemData?: (cartId: number, ingredientId: number) => void;
  handleChangePersonalCartItemData?: (
    id: PersonalCartItemEntity['id']
  ) => Promise<void>;
  pantryItems?: Pantry_ItemEntity[];
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

  const mightHave = useMemo(() => {
    if (!pantryItems) {
      return undefined;
    }
    return checkMightHave(
      pantryItems.find((p) => p.ingredient_id === item.ingredient_id),
      item,
      total()
    );
  }, [pantryItems, item, total]);

  return (
    <FormControlLabel
      sx={{
        width: '100%',
        py: 1,
        borderTop: 1,
        borderColor: 'grey.300',
        '.MuiFormControlLabel-label': {
          width: '100%',
        },
        mx: 0,
      }}
      labelPlacement="start"
      control={
        <Checkbox
          checked={isBought}
          onChange={async () => {
            setIsBought(!isBought);
            if (type === 'cart' && handleChangeCartItemData) {
              handleChangeCartItemData(item.cartId, item.ingredient_id);
              // Cập nhật đã/chưa mua
              await updateCartItem(item.cartId, item.ingredient_id, !isBought);
              return;
            }
            if (type === 'personal' && handleChangePersonalCartItemData) {
              await handleChangePersonalCartItemData(item.cartId);
              // cập nhật đã/chưa mua ở trong hàm trên do trong đây thiếu name
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
              mr: 2,
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              height: 'fit-content',
            }}
          >
            <Typography {...typoProps}>{item.cart?.recipe?.name}</Typography>
            <Typography {...typoProps} fontWeight={900}>
              {item.ingredient?.name}
            </Typography>
            <Typography {...typoProps}>
              {Math.ceil(item.amount)}
              {total ? (
                <span style={{ color: 'grey' }}>
                  {' '}
                  /{Math.ceil(total())}
                  {item?.ingredient.isLiquid ? ' (ml)' : ' (g)'}
                </span>
              ) : (
                ''
              )}
              {pantryItems && mightHave ? (
                <Typography
                  component={'span'}
                  variant="caption"
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.main',
                    px: 0.8,
                    py: 0.4,
                    ml: 1,
                    borderRadius: '6px',
                  }}
                >
                  Tủ lạnh có đủ
                </Typography>
              ) : mightHave == false ? (
                <Typography
                  component={'span'}
                  variant="caption"
                  sx={{
                    color: 'white',
                    bgcolor: 'primary.light',
                    px: 0.8,
                    py: 0.4,
                    ml: 1,
                    borderRadius: '6px',
                  }}
                >
                  Tủ lạnh có nhưng thiếu
                </Typography>
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

function checkMightHave(
  pantryItem: Pantry_ItemEntity | undefined,
  cartItem: Cart_ItemEntity,
  total: number
) {
  if (!pantryItem) {
    return undefined;
  }
  if (pantryItem.ingredient_id === cartItem.ingredient_id) {
    if (pantryItem.amount >= total) {
      return true;
    } else {
      return false;
    }
  }

  return undefined;
}
