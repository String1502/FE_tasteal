import { getStart_EndOfWeek } from '@/pages/MealPlanner';
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const formatNumberWithLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const getWeekLabel = (offset: number) => {
  if (offset === -1) {
    return 'Tuần trước';
  } else if (offset === 1) {
    return 'Tuần sau';
  } else if (offset === 0) {
    return 'Tuần hiện tại';
  } else {
    const { start: weekStart, end: weekEnd } = getStart_EndOfWeek(offset);

    const startMonth = formatNumberWithLeadingZero(weekStart.getMonth() + 1);
    const startDay = formatNumberWithLeadingZero(weekStart.getDate());
    const endMonth = formatNumberWithLeadingZero(weekEnd.getMonth() + 1);
    const endDay = formatNumberWithLeadingZero(weekEnd.getDate());

    return `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
  }
};

export function WeekNavigation({
  weekCounter,
  handleChangeWeekCounter,
}: {
  weekCounter: number;
  handleChangeWeekCounter: (increment: number) => void;
}) {
  const [weekLabel, setWeekLabel] = useState<string>(getWeekLabel(weekCounter));
  useEffect(() => {
    setWeekLabel(getWeekLabel(weekCounter));
  }, [weekCounter]);

  return (
    <>
      <Box
        width={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <IconButton color="primary" onClick={() => handleChangeWeekCounter(-1)}>
          <KeyboardArrowLeftRounded />
        </IconButton>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {weekLabel}
        </Typography>
        <IconButton color="primary" onClick={() => handleChangeWeekCounter(1)}>
          <KeyboardArrowRightRounded />
        </IconButton>
      </Box>
    </>
  );
}
