import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Popover,
} from "@mui/material";
import Layout from "../layout/Layout";
import {
  HighlightAltRounded,
  MapsUgcRounded,
  QuestionMarkRounded,
  RotateLeftRounded,
} from "@mui/icons-material";
import { WeekNavigation } from "@/components/ui/mealPlan/WeekNavigation.tsx";
import WeekDateItem from "@/components/ui/mealPlan/WeekDateItem.tsx";

const ActionSection = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: { xs: "space-between", md: "flex-end" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <IconButton
          color="primary"
          onClick={handleClick}
          sx={{
            border: 1,
          }}
          size="small"
        >
          <QuestionMarkRounded fontSize="small" />
        </IconButton>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          slotProps={{
            paper: {
              sx: {
                borderRadius: 4,
                background: "white",
                width: "280px",
              },
            },
          }}
        >
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <HighlightAltRounded fontSize="small" />
              <Typography variant="body2" fontWeight={"light"}>
                <span style={{ fontWeight: "bold" }}>Kéo và thả </span>
                công thức để di chuyển nó tới bất kỳ ngày nào trong tuần.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <MapsUgcRounded
                sx={{
                  transform: "scaleX(-1)",
                }}
                fontSize="small"
              />
              <Typography variant="body2" fontWeight={"light"}>
                <span style={{ fontWeight: "bold" }}>Thêm </span>
                nhiều công thức nấu ăn ngon từ Tasteal.
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              }}
            >
              <RotateLeftRounded fontSize="small" />
              <Typography variant="body2" fontWeight={"light"}>
                <span style={{ fontWeight: "bold" }}>Đổi </span>
                một công thức để thay thế nó bằng một gợi ý khác.
              </Typography>
            </Box>
          </Box>
        </Popover>

        <Button
          variant="contained"
          color="primary"
          size="small"
          sx={{
            px: 2,
          }}
        >
          Thêm vào giỏ đi chợ
        </Button>
      </Box>
    </>
  );
};

export type DateDisplay = {
  label: string;
  borderRight?: boolean;
  borderBottom?: boolean;
};

const daysInWeek: DateDisplay[] = [
  {
    label: "Thứ hai",
    borderRight: true,
    borderBottom: true,
  },
  {
    label: "Thứ ba",
    borderRight: true,
    borderBottom: true,
  },
  {
    label: "Thứ tư",
    borderRight: true,
    borderBottom: true,
  },
  {
    label: "Thứ năm",
    borderRight: false,
    borderBottom: true,
  },
  {
    label: "Thứ sáu",
    borderRight: true,
    borderBottom: false,
  },
  {
    label: "Thứ bảy",
    borderRight: true,
    borderBottom: false,
  },
  {
    label: "Chủ nhật",
    borderRight: true,
    borderBottom: false,
  },
];

const MealPlanner: React.FC = () => {
  const [weekCounter, setWeekCounter] = React.useState(0);
  function handleChangeWeekCounter(increment: number) {
    setWeekCounter((prev) => prev + increment);
  }

  const [weekDates, setWeekDates] = React.useState<Date[]>([]);

  function getWeekDates(offset: number): Date[] {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Lấy ngày trong tuần của ngày hiện tại (0 là Chủ Nhật, 1 là thứ Hai, ..., 6 là thứ Bảy)

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    ); // Đặt ngày bắt đầu tuần
    startOfWeek.setDate(startOfWeek.getDate() + 7 * offset); // Áp dụng offset

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Ngày kết thúc tuần là ngày bắt đầu + 6

    const dates: Date[] = [];

    for (
      let day = new Date(startOfWeek);
      day <= endOfWeek;
      day.setDate(day.getDate() + 1)
    ) {
      dates.push(new Date(day));
    }

    return dates;
  }

  useEffect(() => {
    setWeekCounter(0);
    setWeekDates(getWeekDates(0));
  }, []);

  useEffect(() => {
    setWeekDates(getWeekDates(weekCounter));
  }, [weekCounter]);

  return (
    <Layout>
      <Grid container alignItems={"stretch"} justifyContent={"center"}>
        <Grid item xs={12}>
          <Container
            sx={{
              py: 3,
            }}
          >
            <Grid
              sx={{ width: "100%" }}
              container
              justifyContent={"center"}
              alignItems={"center"}
              spacing={{
                xs: 3,
                md: 2,
              }}
            >
              <Grid item xs={12} md={4}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "900",
                    textTransform: "uppercase",
                  }}
                >
                  Lịch ăn của tôi
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <WeekNavigation
                  weekCounter={weekCounter}
                  handleChangeWeekCounter={handleChangeWeekCounter}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <ActionSection />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                <WeekNavigation
                  weekCounter={weekCounter}
                  handleChangeWeekCounter={handleChangeWeekCounter}
                />
              </Grid>
            </Grid>
          </Container>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
              py: 4,
            }}
          >
            <Container>
              <Box
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  backgroundColor: "background.default",
                }}
              >
                <Grid
                  container
                  justifyContent={"flex-start"}
                  alignItems={"stretch"}
                >
                  {daysInWeek.map((item, index) => (
                    <Grid item xs={12} md={3} key={index}>
                      <WeekDateItem
                        dateDisplay={item}
                        date={weekDates[index]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MealPlanner;
