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
import AccountService from "@/lib/services/accountService";
import PlanItemService from "@/lib/services/planItemService";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { AccountEntity } from "@/lib/models/entities/AccountEntity/AccountEntity";
import { Plan_ItemEntity } from "@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity";

export type DateDisplay = {
  label: string;
  date?: string;
  borderRight?: boolean;
  borderBottom?: boolean;
  planItems?: Plan_ItemEntity[];
};

const initialWeekDates: DateDisplay[] = [
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
  //#region Week đếm số
  const [weekCounter, setWeekCounter] = React.useState(0);
  function handleChangeWeekCounter(increment: number) {
    setWeekCounter((prev) => prev + increment);
  }
  //#endregion

  const [accountData, setAccountData] = React.useState<
    AccountEntity | undefined
  >(undefined);

  const [weekDates, setWeekDates] = React.useState<DateDisplay[]>([]);

  const [planItemData, setPlanItemData] = React.useState<Plan_ItemEntity[]>([]);

  function getWeekDates(offset: number): string[] {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Lấy ngày trong tuần của ngày hiện tại (0 là Chủ Nhật, 1 là thứ Hai, ..., 6 là thứ Bảy)

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(
      currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
    ); // Đặt ngày bắt đầu tuần
    startOfWeek.setDate(startOfWeek.getDate() + 7 * offset); // Áp dụng offset

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); // Ngày kết thúc tuần là ngày bắt đầu + 6

    const dates: string[] = [];

    for (
      let day = new Date(startOfWeek);
      day <= endOfWeek;
      day.setDate(day.getDate() + 1)
    ) {
      const dateString = new Date(day.getTime()).toISOString().split("T")[0];
      dates.push(dateString);
    }

    return dates;
  }

  //#region UseEffect

  useEffect(() => {
    async function fetchData() {
      const account = await AccountService.GetByUid(1);

      setAccountData(account);

      const planItems = await PlanItemService.GetPlanItemsByAccountId(
        account?.uid
      );

      if (!planItems) {
        return;
      }

      setPlanItemData(planItems);
      setWeekCounter(0);
      const dates = getWeekDates(0);
      const data: DateDisplay[] = [];

      for (let i = 0; i < initialWeekDates.length; i++) {
        const date = dates[i];
        if (date) {
          data.push({
            ...initialWeekDates[i],
            date,
            planItems: planItems
              .filter((item) => {
                const itemDate = new Date(item.plan?.date);
                return itemDate.toISOString().split("T")[0] === date;
              })
              .sort((a, b) => {
                return a.order - b.order;
              }),
          });
        }
      }

      setWeekDates(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const dates = getWeekDates(weekCounter);
    const data: DateDisplay[] = [];

    for (let i = 0; i < initialWeekDates.length; i++) {
      const date = dates[i];
      if (date) {
        data.push({
          ...initialWeekDates[i],
          date,
          planItems: planItemData
            .filter((item) => {
              const itemDate = new Date(item.plan?.date);
              return itemDate.toISOString().split("T")[0] === date;
            })
            .sort((a, b) => {
              return a.order - b.order;
            }),
        });
      }
    }

    setWeekDates(data);
  }, [weekCounter]);

  useEffect(() => {
    setWeekDates((prev) => {
      return prev.map((date) => {
        return {
          ...date,
          planItems: planItemData
            .filter((item) => {
              const itemDate = new Date(item.plan?.date);
              return itemDate.toISOString().split("T")[0] === date.date;
            })
            .sort((a, b) => {
              return a.order - b.order;
            }),
        };
      });
    });
  }, [planItemData]);

  //#endregion

  //#region Drag and Drop
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = (dragStart: DropResult) => {
    setIsDragging(true);
    console.log(dragStart);
  };
  const onDragEnd = (dropResult: DropResult) => {
    setIsDragging(false);

    if (
      !dropResult.destination ||
      !dropResult.source ||
      !dropResult.draggableId
    )
      return;
    if (
      dropResult.destination.index === dropResult.source.index &&
      dropResult.destination.droppableId === dropResult.source.droppableId
    ) {
      return;
    }

    let oldDate = new Date(dropResult.source.droppableId);
    let newDate = new Date(dropResult.destination.droppableId);

    const planItemMove = {
      id: parseInt(dropResult.draggableId),
      from: oldDate,
      to: newDate,
      fromIndex: dropResult.source.index,
      toIndex: dropResult.destination.index,
    };

    const planItem = planItemData.find((item) => item.id === planItemMove.id);

    let finalPlanItemData = [
      ...planItemData.filter(
        (item) =>
          item.plan?.date.getTime() !== oldDate.getTime() &&
          item.plan?.date.getTime() !== newDate.getTime()
      ),
    ];

    if (planItemMove.from.getTime() !== planItemMove.to.getTime()) {
      let sourceArray = planItemData
        .filter(
          (item) => item.plan?.date.getTime() === planItemMove.from.getTime()
        )
        .sort((a, b) => {
          return a.order - b.order;
        });
      sourceArray.splice(planItemMove.fromIndex, 1);
      sourceArray = sourceArray.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });

      let destinationArray = planItemData
        .filter(
          (item) => item.plan?.date.getTime() === planItemMove.to.getTime()
        )
        .sort((a, b) => {
          return a.order - b.order;
        });

      const existRecipe = destinationArray
        .map((item) => item.recipe.id)
        .findIndex((id) => id === planItem.recipe.id);

      if (existRecipe !== -1) {
        if (confirm("Công thức trùng lặp! Bạn vẫn muốn thêm?")) {
        } else {
          return;
        }
      }

      destinationArray.splice(planItemMove.toIndex, 0, {
        ...planItem,
        plan: {
          ...planItem.plan,
          date: planItemMove.to,
        },
      });
      destinationArray = destinationArray.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });

      finalPlanItemData = [
        ...finalPlanItemData,
        ...sourceArray,
        ...destinationArray,
      ];
    } else {
      let sourceArray = planItemData
        .filter(
          (item) => item.plan?.date.getTime() === planItemMove.from.getTime()
        )
        .sort((a, b) => {
          return a.order - b.order;
        });

      sourceArray.splice(planItemMove.fromIndex, 1);
      sourceArray.splice(planItemMove.toIndex, 0, {
        ...planItem,
        plan: {
          ...planItem.plan,
          date: planItemMove.to,
        },
      });

      sourceArray = sourceArray.map((item, index) => {
        return {
          ...item,
          order: index + 1,
        };
      });
      finalPlanItemData = [...finalPlanItemData, ...sourceArray];
    }

    setPlanItemData(finalPlanItemData);
  };

  //#endregion

  function handleRemovePlanItem(id: number) {
    const planItemDelete = planItemData.find((item) => item.id === id);

    const newPlanItemData = planItemData
      .filter((item) => item.id !== id)
      .map((item) => {
        if (
          item.plan?.date.getTime() === planItemDelete?.plan?.date.getTime() &&
          item.order >= planItemDelete?.order
        ) {
          return {
            ...item,
            order: item.order - 1,
          };
        }
        return {
          ...item,
        };
      });

    setPlanItemData(newPlanItemData);
  }

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
              <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                    {weekDates.map((item, index) => (
                      <Grid item xs={12} md={3} key={index}>
                        <WeekDateItem
                          isDragging={isDragging}
                          weekDates={item}
                          handleRemovePlanItem={handleRemovePlanItem}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </DragDropContext>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default MealPlanner;

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
