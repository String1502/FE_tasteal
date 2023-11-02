import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";

const formatNumberWithLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

export function WeekNavigation({
  weekCounter,
  handleChangeWeekCounter,
}: {
  weekCounter: number;
  handleChangeWeekCounter: (increment: number) => void;
}) {
  const getWeekLabel = () => {
    if (weekCounter === -1) {
      return "Tuần trước";
    } else if (weekCounter === 1) {
      return "Tuần sau";
    } else if (weekCounter === 0) {
      return "Tuần hiện tại";
    } else {
      const currentWeek = new Date();
      currentWeek.setDate(currentWeek.getDate() + weekCounter * 7);

      // Set the start of the week to Monday
      const weekStart = new Date(currentWeek);
      weekStart.setDate(weekStart.getDate() - (currentWeek.getDay() - 1));

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      const startMonth = formatNumberWithLeadingZero(weekStart.getMonth() + 1);
      const startDay = formatNumberWithLeadingZero(weekStart.getDate());
      const endMonth = formatNumberWithLeadingZero(weekEnd.getMonth() + 1);
      const endDay = formatNumberWithLeadingZero(weekEnd.getDate());

      return `${startDay}/${startMonth} - ${endDay}/${endMonth}`;
    }
  };

  return (
    <Box
      width={"100%"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <IconButton color="primary" onClick={() => handleChangeWeekCounter(-1)}>
        <KeyboardArrowLeftRounded />
      </IconButton>
      <Typography
        variant="body1"
        sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}
      >
        {getWeekLabel()}
      </Typography>
      <IconButton color="primary" onClick={() => handleChangeWeekCounter(1)}>
        <KeyboardArrowRightRounded />
      </IconButton>
    </Box>
  );
}
