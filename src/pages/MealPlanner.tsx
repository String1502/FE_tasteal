import React, { useState } from "react";
import { RecipeEntity } from "../types/type";
import { recipes } from "../types/sampleData";
import { MealPlanCard } from "../components/common/card/MealPlanCard.tsx";
import {
  Container,
  Grid,
  Typography,
  TypographyProps,
  Button,
  Box,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Layout from "../layout/Layout";
import {
  AddRounded,
  AdsClickRounded,
  ChangeCircleRounded,
  ExpandMore,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  LibraryAdd,
} from "@mui/icons-material";

const typoProps: TypographyProps = {
  variant: "h6",
  fontWeight: "900",
  textTransform: "uppercase",
  fontFamily: "poppins",
};

const formatNumberWithLeadingZero = (number: number) => {
  return number < 10 ? `0${number}` : number;
};

const WeekNavigation: React.FC = () => {
  const [weekCounter, setWeekCounter] = useState<number>(0);

  const handleNavigationClick = (increment: number) => {
    setWeekCounter(weekCounter + increment);
  };

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
    <Box width={"100%"} sx={{ display: "flex", justifyContent: "center", ml:15 }}>
      <Button onClick={() => handleNavigationClick(-1)}>
        <KeyboardArrowLeftRounded />
      </Button>
      <Typography {...typoProps} align="center" sx={{ flexGrow: 1 }}>
        {getWeekLabel()}
      </Typography>
      <Button onClick={() => handleNavigationClick(1)}>
        <KeyboardArrowRightRounded />
      </Button>
    </Box>
  );
};

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const MyGroceriesSection: React.FC = () => {
  return (
    <Box sx={{ width: "100%", m: 2 }}>
      <Typography>Kho Hàng Của Tôi</Typography>
      <Typography {...typoProps}>$---</Typography>
      <Typography
        sx={{ fontfamily: "poppins", fontSize: "11px", color: "gray" }}
      >
        Tổng Ước Lượng
        <IconButton>
          <HelpOutlineIcon sx={{ width: "15px", height: "15px" }} />
        </IconButton>
      </Typography>
      <Typography {...typoProps}>$---</Typography>
      <Typography
        sx={{ fontfamily: "poppins", fontSize: "11px", color: "gray" }}
      >
        Giá cả trung bình mỗi bữa ăn dựa trên tất cả bữa ăn tuần này
      </Typography>
      <Button variant="contained" sx={{ width: "100%", mt: 2 }}>
        THÊM TẤT CẢ
      </Button>
    </Box>
  );
};

const HowItWorksSection: React.FC = () => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ borderRadius: "10px" }}
          expandIcon={<ExpandMore />}
        >
          <Typography>Cách Hoạt Động</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AdsClickRounded></AdsClickRounded>
            <Typography sx={{ ml: 2 }}>
              <span style={{ fontWeight: "bold", color: "#002c36" }}>
                Kéo và thả
              </span>{" "}
              một công thức để di chuyển nó tời một ngày bất kỳ trong tuần
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LibraryAdd></LibraryAdd>
            <Typography sx={{ ml: 2 }}>
              <span style={{ fontWeight: "bold", color: "#002c36" }}>Thêm</span>{" "}
              số lượng công thức mà bạn mong muốn
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <ChangeCircleRounded></ChangeCircleRounded>
            <Typography sx={{ ml: 2 }}>
              <span style={{ fontWeight: "bold", color: "#002c36" }}>
                Chuyển
              </span>{" "}
              đổi công thức để thay thế nó với một đề xuất cá nhân
            </Typography>
          </Box>

          <hr style={{ width: "100%", color: "gray", margin: "10px 0" }}></hr>

          <Typography
            sx={{
              textDecoration: "underline",
              alignContent: "center",
              width: "100%",
            }}
          >
            TÌM HIỂU THÊM
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const MealPlanner: React.FC = () => {
  const [resultItem, setResultItem] = React.useState<RecipeEntity[]>(recipes);
  return (
    <Layout>
      <Grid
        container
        alignItems={"stretch"}
        justifyContent={"center"}
        spacing={4}
        sx={{
          mt: "2px",
        }}
      >
        <Grid item xs={12}>
          <Box
          sx={{ width: "80%", m: "auto" }}>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
      
            >
              <Grid item xs={12} md={3}>
                <Typography
                  {...typoProps}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "28px",
                    fontFamily: "Poppins SC",
                  }}
                >
                  LỊCH ĂN CỦA TÔI
                </Typography>
              </Grid>

              <Grid item xs={12} md={4}>
                <WeekNavigation />
              </Grid>

              <Grid item xs={12} md={5}></Grid>
   
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: "secondary.main",
            }}
          >
            <Box sx={{ width: "80%", m: "auto" }}>
              <Grid
                container
                spacing={2}
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
              >
                <Grid item xs={12} md={2.5}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "white",
                      marginBottom: "10px",
                      borderRadius: "10px",
                    }}
                  >
                    <MyGroceriesSection />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",

                      borderRadius: "10px",
                      height: "520px",
                    }}
                  >
                    <HowItWorksSection />
                  </Box>
                </Grid>
                <Grid item xs={12} md={true}>
                  <Box
                    sx={{
                      width: "100%",
                      borderRadius: 3,
                      p: 4,
                      backgroundColor: "white",
                      mb: 5,
                    }}
                  >
                    <Grid
                      container
                      spacing={1}
                      justifyContent={"flex-start"}
                      alignItems={"flex-start"}
                    >
                      {/* sx={{
                    display: {
                        xs: "none",
                        md: "block",
                    }
                }} */}
                      <Grid container>
                        {[
                          "Thứ hai",
                          "Thứ ba",
                          "Thứ tư",
                          "Thứ năm",
                          "Thứ sáu",
                          "Thứ bảy",
                          "Chủ nhật",
                          "",
                        ].map((day, index) => (
                          <Grid item xs={12} md={3} key={index}>
                            {day && (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  backgroundColor: "white",
                                  height: "fit-content",
                                  p: 2,
                                  border: "1px solid #f0f0f0",
                                }}
                              >
                                <Grid
                                  container
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  sx={{
                                    mb: 2,
                                  }}
                                >
                                  <Grid item>
                                    <Typography>{day}</Typography>
                                  </Grid>
                                  <Grid item >
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                 
                                    >
                                      <AddRounded
                                        sx={{
                                          width: "20px", // Đặt độ rộng của biểu tượng (AddRounded)
                                          height: "20px", // Đặt chiều cao của biểu tượng (AddRounded), tùy theo nhu cầu
                                        }}
                                      />
                                    </Button>
                                  </Grid>
                                </Grid>
                                {resultItem.length > 0 && (
                                  <MealPlanCard
                                    recipe={resultItem[0] as RecipeEntity}
                                  />
                                )}
                              </Box>
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MealPlanner;
