import { Button, Box } from '@mui/material';
import DuplicateMealPlanDialog from './DuplicateMealPlanDialog';
import { useState } from 'react';

import SlideInDialog from '@/components/common/dialog/SlideInDialog';
import { DateDisplay } from '@/pages/MealPlanner';

export function ActionSection({
  weekCounter,
  addAllToCart,
  handleDuplicatePlanMeal,
  weekDates,
}: {
  weekCounter: number;
  addAllToCart: () => Promise<void>;
  handleDuplicatePlanMeal: (
    fromWeekCounter: number,
    toWeekCounter: number
  ) => Promise<void>;
  weekDates: DateDisplay[];
}) {
  // Dialog Sao chép
  const [open, setOpen] = useState(false);
  const [targetWeekCounter, setWeekCounter] = useState(0);
  function handleChangeWeekCounter(increment: number) {
    setWeekCounter((prev) => prev + increment);
  }
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
          disabled={weekDates.map((item) => item.planItems).flat().length > 0}
          onClick={() => setOpen(true)}
        >
          Sao chép
        </Button>
        <SlideInDialog
          open={open}
          handleClose={() => setOpen(false)}
          title="Sao chép lịch ăn từ tuần khác"
          content={
            <DuplicateMealPlanDialog
              weekCounter={targetWeekCounter}
              handleChangeWeekCounter={handleChangeWeekCounter}
            />
          }
          cancelText="Hủy"
          confirmText="Sao chép"
          onClickConfirm={() => {
            handleDuplicatePlanMeal(targetWeekCounter, weekCounter);
          }}
          confirmButtonProps={{
            disabled: targetWeekCounter === weekCounter,
          }}
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
