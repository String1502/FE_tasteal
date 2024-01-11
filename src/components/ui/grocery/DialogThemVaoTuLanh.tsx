import { Cart_ItemEntity } from '@/lib/models/entities/Cart_ItemEntity/Cart_ItemEntity';
import { useState } from 'react';
import { DialogContent } from './DialogContent';
import { CustomDialog } from '@/components/common/dialog/CustomDialog';
import { Button, Stack } from '@mui/material';
import { Pantry_ItemEntity } from '@/lib/models/entities/Pantry_ItemEntity/Pantry_ItemEntity';
import { CreatePantryItemReq } from '@/lib/models/dtos/Request/CreatePantryItemReq/CreatePantryItemReq';

export type CartItemId = {
  cartId: Cart_ItemEntity['cartId'];
  ingredient_id: Cart_ItemEntity['ingredient_id'];
};

export function DialogThemVaoTuLanh({
  open,
  handleClose,
  cartItemData,
  addToPantry,
  pantryItems,
}: {
  open: boolean;
  handleClose: () => void;
  cartItemData: Cart_ItemEntity[];
  addToPantry: (cartItemAdd: CreatePantryItemReq[]) => Promise<void>;
  pantryItems: Pantry_ItemEntity[];
}) {
  const [cartItemAdd, setCartAdd] = useState<Cart_ItemEntity[]>([]);

  const handleCartAdd = (
    type: 'add' | 'addAll',
    newCartAdd: Cart_ItemEntity[]
  ) => {
    if (type === 'add') {
      if (
        newCartAdd.every((cartId) => {
          const check = cartItemAdd.find((id) => {
            return (
              id.ingredient_id === cartId.ingredient_id &&
              id.cartId === cartId.cartId
            );
          });
          if (check) {
            return true;
          }
          return false;
        })
      ) {
        setCartAdd((prev) =>
          prev.filter((id) => {
            const check = newCartAdd.find((newId) => {
              return (
                newId.ingredient_id === id.ingredient_id &&
                newId.cartId === id.cartId
              );
            });
            if (!check) {
              return true;
            }
            return false;
          })
        );
      } else {
        setCartAdd((prev) => [...prev, ...newCartAdd]);
      }
    } else if (type === 'addAll') {
      setCartAdd([...newCartAdd]);
    }
  };

  const [cartItemDungTuLanh, setCartTuLanh] = useState<
    Pantry_ItemEntity['id'][]
  >([]);
  const handleCartTuLanh = (
    type: 'add' | 'addAll',
    newCartTuLanh: Pantry_ItemEntity['id'][]
  ) => {
    if (type == 'add') {
      if (newCartTuLanh.every((id) => cartItemDungTuLanh.includes(id))) {
        setCartTuLanh((prev) =>
          prev.filter((id) => {
            return !newCartTuLanh.includes(id);
          })
        );
      } else {
        setCartTuLanh((prev) => [...prev, ...newCartTuLanh]);
      }
    } else if (type == 'addAll') {
      setCartTuLanh([...newCartTuLanh]);
    }
  };

  return (
    <CustomDialog
      open={open}
      handleClose={handleClose}
      title="Thêm vào tủ lạnh"
      children={
        <DialogContent
          cartItemData={cartItemData}
          pantryItems={pantryItems}
          cartItemAdd={cartItemAdd}
          handleCartAdd={handleCartAdd}
          cartItemDungTuLanh={cartItemDungTuLanh}
          handleCartTuLanh={handleCartTuLanh}
        />
      }
      childrenContainerSx={{
        px: 0,
      }}
      action={
        <Stack
          gap={2}
          direction={'row'}
          sx={{
            width: '100%',
          }}
          justifyContent={'center'}
        >
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant="contained"
            disabled={cartItemAdd.length == 0}
            sx={{
              boxShadow: 0,
            }}
            onClick={async () => {
              const useTuLanh = pantryItems.filter((item) =>
                cartItemDungTuLanh.includes(item.id)
              );

              let data: CreatePantryItemReq[] = cartItemAdd
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
                .map((item) => {
                  let total = item.reduce(
                    (result, element) => result + element.amount,
                    0
                  );

                  const foundTulanh = useTuLanh.find(
                    (tulanh) => tulanh.ingredient_id === item[0].ingredient_id
                  );
                  if (foundTulanh) {
                    total = total - foundTulanh.amount;
                  }

                  return {
                    account_id: '',
                    ingredient_id: item[0].ingredient_id,
                    number: total,
                  };
                })
                .filter((item) => item.number > 0);

              console.log(data);

              handleClose();
              await addToPantry(data);
            }}
          >
            Thêm
          </Button>
        </Stack>
      }
    />
  );
}
