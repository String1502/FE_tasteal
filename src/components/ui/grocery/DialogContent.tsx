import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import {
  CheckCircleRounded,
  RadioButtonUncheckedRounded,
  WarningRounded,
} from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  TypographyProps,
} from '@mui/material';
import { DialogItem } from './DialogItem';
import { useEffect, useState } from 'react';
export const typoProps: TypographyProps = {
  variant: 'body2',
  fontWeight: 'light',
  sx: {
    width: '100%',
  },
};
export function DialogContent({
  cartItemData,
  cartItemAdd,
  handleCartAdd,
  pantryItems,
  cartItemDungTuLanh,
  handleCartTuLanh,
}: {
  cartItemData: Cart_ItemEntity[];
  pantryItems: Pantry_ItemEntity[];
  cartItemAdd: Cart_ItemEntity[];
  handleCartAdd: (
    type: 'add' | 'addAll',
    newCartAdd: Cart_ItemEntity[]
  ) => void;
  cartItemDungTuLanh: Pantry_ItemEntity['id'][];
  handleCartTuLanh: (
    type: 'add' | 'addAll',
    newCartTuLanh: Pantry_ItemEntity['id'][]
  ) => void;
}) {
  // CartItem
  const [displayCartItem, setDisplayCartItem] = useState<
    Cart_ItemEntity[][] | undefined
  >(undefined);
  useEffect(() => {
    const data = cartItemData
      .reduce((result: Cart_ItemEntity[][], element) => {
        const foundItem = result.find(
          (item) => item[0].ingredient_id === element.ingredient_id
        );
        if (foundItem) {
          foundItem.push(element);
        } else {
          result.push([element]);
        }

        return result;
      }, [])
      .map((x) => x.filter((x) => x.isBought))
      .filter((x) => x.length > 0);

    setDisplayCartItem(data);
  }, [cartItemData]);

  // Tủ lạnh s
  const [tulanhs, setTuLanh] = useState<Pantry_ItemEntity[]>([]);
  useEffect(() => {
    if (!displayCartItem || displayCartItem.length == 0 || !pantryItems) {
      return;
    }

    const ids = displayCartItem.map((x) => x[0].ingredient_id);
    const data = pantryItems.filter((x) => ids.includes(x.ingredient_id));
    setTuLanh(data);
  }, [pantryItems, displayCartItem]);

  // Check all cartitem
  const [checkAllCartItem, setCheckAllCartItem] = useState(false);
  useEffect(() => {
    const data =
      displayCartItem &&
      displayCartItem.flat().every((x) => {
        const check = cartItemAdd.find((y) => {
          return y.ingredient_id === x.ingredient_id && y.cartId === x.cartId;
        });
        if (check) {
          return true;
        }
        return false;
      });

    setCheckAllCartItem(data);
  }, [displayCartItem, cartItemAdd, handleCartAdd]);

  // Check all tu lanh
  const [checkAllTuLanh, setCheckAllTuLanh] = useState(false);

  useEffect(() => {
    if (tulanhs.length == 0) {
      return;
    }
    const ids = tulanhs.map((x) => x.id);

    const data = ids.every((x) => {
      return cartItemDungTuLanh.includes(x);
    });
    setCheckAllTuLanh(data);
  }, [cartItemDungTuLanh, tulanhs]);

  return (
    <>
      <Stack direction={'column'}>
        <Box
          sx={{
            p: 4,
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              width: '100%',
              p: 4,
              borderRadius: 4,
              bgcolor: 'primary.light',
              color: 'white',
            }}
            gap={2}
            alignItems={'center'}
          >
            <WarningRounded sx={{ fontSize: 50 }} />
            <Typography
              variant="body2"
              sx={{
                color: 'inherit',
              }}
            >
              Tất cả nguyên liệu đã mua (ngoại trừ đồ cá nhân không nằm trong hệ
              thống) sẽ được thêm vào tủ lạnh của bạn. Sau đó giỏ đi chợ sẽ được
              dọn!
            </Typography>
          </Stack>
        </Box>

        <Stack
          gap={1}
          direction={'row'}
          sx={{
            width: '100%',
            py: 1.5,
            borderTop: 1,
            borderColor: 'grey.300',
            mx: 0,
            pr: 4,
          }}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              opacity: 1,
            }}
          ></Box>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <FormControlLabel
              sx={{
                display: tulanhs.length == 0 ? 'none' : '',
              }}
              control={
                <Checkbox
                  checked={checkAllTuLanh}
                  onClick={() => {
                    handleCartTuLanh(
                      'addAll',
                      checkAllTuLanh ? [] : tulanhs.map((x) => x.id)
                    );
                  }}
                />
              }
              label={<Typography {...customTypography}>Chọn tất cả</Typography>}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={checkAllCartItem}
                  onChange={() => {
                    if (!displayCartItem) {
                      return;
                    }
                    handleCartAdd(
                      'addAll',
                      checkAllCartItem ? [] : displayCartItem.flat()
                    );
                  }}
                  icon={<RadioButtonUncheckedRounded />}
                  checkedIcon={<CheckCircleRounded />}
                />
              }
              label={<Typography {...customTypography}>Chọn tất cả</Typography>}
            />
          </Stack>
        </Stack>

        {displayCartItem &&
          displayCartItem.map((item, index) => {
            const total = item.reduce((a, b) => a + b.amount, 0);

            const tulanh: Pantry_ItemEntity | undefined = tulanhs.find(
              (x) => x.ingredient_id == item[0].ingredient_id
            );

            const addCheck = item.every((x) => {
              const check = cartItemAdd.find((y) => {
                return (
                  y.ingredient_id === x.ingredient_id && y.cartId === x.cartId
                );
              });
              if (check) {
                return true;
              }
              return false;
            });

            const tulanhCheck = cartItemDungTuLanh.includes(tulanh?.id);
            return (
              <DialogItem
                key={index}
                first={item[0]}
                item={item}
                total={total}
                handleCartAdd={handleCartAdd}
                addCheck={addCheck}
                tulanhCheck={tulanhCheck}
                handleCartTuLanh={handleCartTuLanh}
                tulanh={tulanh}
              />
            );
          })}
      </Stack>
    </>
  );
}

export const customTypography: TypographyProps = {
  variant: 'body2',
  sx: {
    textWrap: 'nowrap',
    width: '160px',
  },
};
