import { Box, Stack, Typography } from '@mui/material';
import { WeekNavigation } from './WeekNavigation';

function DuplicateMealPlanDialog({
  weekCounter,
  handleChangeWeekCounter,
}: {
  weekCounter: number;
  handleChangeWeekCounter(increment: number): void;
}) {
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      sx={{
        width: '350px',
      }}
      gap={2}
    >
      <Typography>Bạn muốn sao chép lịch ăn của tuần:</Typography>
      <Box
        component={'div'}
        sx={{
          overflow: 'hidden',
          p: 0,
          bgcolor: 'primary.main',
          borderRadius: '16px',
          minWidth: '90%',
        }}
      >
        <WeekNavigation
          weekCounter={weekCounter}
          handleChangeWeekCounter={handleChangeWeekCounter}
          color="white"
        />
      </Box>
    </Stack>
  );
}

export default DuplicateMealPlanDialog;
