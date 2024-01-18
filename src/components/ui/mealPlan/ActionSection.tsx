import { Button, Box } from '@mui/material';
import DuplicateMealPlanDialog from './DuplicateMealPlanDialog';
import { useState } from 'react';
import { CustomDialog } from '@/components/common/dialog/CustomDialog';

export function ActionSection({
  weekCounter,
  addAllToCart,
}: {
  weekCounter: number;
  addAllToCart: () => Promise<void>;
}) {
  // Dialog Sao chép
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            px: 2,
          }}
          onClick={() => setOpen(true)}
        >
          Sao chép
        </Button>
        <CustomDialog
          open={open}
          handleClose={() => setOpen(false)}
          title="Thêm vào tủ lạnh"
          children={<DuplicateMealPlanDialog />}
          childrenContainerSx={{
            px: 0,
          }}
          // action={
          //   <Stack
          //     gap={2}
          //     direction={'row'}
          //     sx={{
          //       width: '100%',
          //     }}
          //     justifyContent={'center'}
          //   >
          //     <Button variant="outlined" onClick={handleClose}>
          //       Hủy
          //     </Button>
          //     <Button
          //       variant="contained"
          //       disabled={cartItemAdd.length == 0}
          //       sx={{
          //         boxShadow: 0,
          //       }}
          //       onClick={async () => {
          //         const useTuLanh = pantryItems.filter((item) =>
          //           cartItemDungTuLanh.includes(item.id)
          //         );
          //         let data: CreatePantryItemReq[] = cartItemAdd
          //           .reduce((result: Cart_ItemEntity[][], element) => {
          //             const foundItem = result.find(
          //               (item) =>
          //                 item[0].ingredient_id === element.ingredient_id
          //             );
          //             if (foundItem) {
          //               foundItem.push(element);
          //             } else {
          //               result.push([element]);
          //             }
          //             return result;
          //           }, [])
          //           .map((item) => {
          //             let total = item.reduce(
          //               (result, element) => result + element.amount,
          //               0
          //             );
          //             const foundTulanh = useTuLanh.find(
          //               (tulanh) =>
          //                 tulanh.ingredient_id === item[0].ingredient_id
          //             );
          //             if (foundTulanh) {
          //               total = total - foundTulanh.amount;
          //             }
          //             return {
          //               account_id: '',
          //               ingredient_id: item[0].ingredient_id,
          //               number: total,
          //             };
          //           })
          //           .filter((item) => item.number > 0);
          //         console.log(data);
          //         handleClose();
          //         await addToPantry(data);
          //       }}
          //     >
          //       Thêm
          //     </Button>
          //   </Stack>
          // }
        />

        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            px: 2,
          }}
          onClick={async () => {
            await addAllToCart();
          }}
        >
          Thêm vào giỏ đi chợ
        </Button>
      </Box>
    </>
  );
}
