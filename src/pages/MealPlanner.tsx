import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Layout from '../layout/Layout';
import { WeekNavigation } from '@/components/ui/mealPlan/WeekNavigation.tsx';
import WeekDateItem from '@/components/ui/mealPlan/WeekDateItem.tsx';
import PlanItemService from '@/lib/services/planItemService';

import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Plan_ItemEntity } from '@/lib/models/entities/Plan_ItemEntity/Plan_ItemEntity';
import AppContext from '@/lib/contexts/AppContext';
import { ActionSection } from '../components/ui/mealPlan/ActionSection';
import {
  PlanDeleteReq,
  PlanReq,
} from '@/lib/models/dtos/Request/PlanReq/PlanReq';
import { formatDateToStringInDB } from '@/utils/format';
import useSnackbarService from '@/lib/hooks/useSnackbar';
import CartItemService from '@/lib/services/CartItemService';
import { RecipeToCartReq } from '@/lib/models/dtos/Request/RecipeToCartReq/RecipeToCartReq';

export const compareTwoDates = (date1: Date, date2: Date) => {
  return (
    date1.toLocaleDateString('vi-VN') === date2.toLocaleDateString('vi-VN')
  );
};

export type DateDisplay = {
  label: string;
  date?: Date;
  planItems?: Plan_ItemEntity[];
};

const initialWeekDates: DateDisplay[] = [
  {
    label: 'Thứ hai',
  },
  {
    label: 'Thứ ba',
  },
  {
    label: 'Thứ tư',
  },
  {
    label: 'Thứ năm',
  },
  {
    label: 'Thứ sáu',
  },
  {
    label: 'Thứ bảy',
  },
  {
    label: 'Chủ nhật',
  },
];

export const getStart_EndOfWeek = (
  offset: number
): { start: Date; end: Date } => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(
    currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );

  startOfWeek.setDate(startOfWeek.getDate() + 7 * offset);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return { start: startOfWeek, end: endOfWeek };
};

function getWeekDates(offset: number): Date[] {
  const { start: startOfWeek, end: endOfWeek } = getStart_EndOfWeek(offset);

  const dates: Date[] = [];

  for (
    let day = new Date(startOfWeek);
    day <= endOfWeek;
    day.setDate(day.getDate() + 1)
  ) {
    dates.push(new Date(day.getTime()));
  }

  return dates;
}

const MealPlanner: React.FC = () => {
  const { handleSpinner, login } = useContext(AppContext);
  const [snackbarAlert] = useSnackbarService();

  //#region Week đếm số
  const [weekCounter, setWeekCounter] = React.useState(0);
  function handleChangeWeekCounter(increment: number) {
    setWeekCounter((prev) => prev + increment);
  }
  //#endregion

  // #region Dữ liệu chính

  const [weekDates, setWeekDates] = React.useState<DateDisplay[]>([]);

  const [planItemData, setPlanItemData] = React.useState<Plan_ItemEntity[]>([]);

  console.log(weekDates);
  console.log(planItemData.map((item) => item.plan?.date));

  //#endregion

  //#region UseEffect

  useEffect(() => {
    async function fetchData(uid: string) {
      handleSpinner(true);

      const planItems = await PlanItemService.GetPlanItemsByAccountId(uid);

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
                return compareTwoDates(itemDate, date);
              })
              .sort((a, b) => {
                return a.order - b.order;
              }),
          });
        }
      }
      handleSpinner(false);

      setWeekDates(data);
    }

    if (login.isUserSignedIn == true && login.user != undefined) {
      fetchData(login.user.uid);
    }
  }, [login.user]);

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
              return compareTwoDates(itemDate, date);
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
              return compareTwoDates(itemDate, date.date);
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
  const onDragEnd = async (dropResult: DropResult) => {
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
      id: dropResult.draggableId,
      from: oldDate,
      to: newDate,
      fromIndex: dropResult.source.index,
      toIndex: dropResult.destination.index,
    };

    console.log(planItemMove);

    const planItem = planItemData.find(
      (item) => item.id.toString() === planItemMove.id
    );

    let finalPlanItemData = [
      ...planItemData.filter(
        (item) =>
          !compareTwoDates(item.plan?.date, oldDate) &&
          !compareTwoDates(item.plan?.date, newDate)
      ),
    ];
    let sourceArray: Plan_ItemEntity[] = [];
    let destinationArray: Plan_ItemEntity[] = [];

    if (!compareTwoDates(planItemMove.from, planItemMove.to)) {
      sourceArray = planItemData
        .filter((item) => compareTwoDates(item.plan?.date, planItemMove.from))
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

      destinationArray = planItemData
        .filter((item) => compareTwoDates(item.plan?.date, planItemMove.to))
        .sort((a, b) => {
          return a.order - b.order;
        });

      const existRecipe = destinationArray
        .map((item) => item.recipe.id)
        .findIndex((id) => id === planItem.recipe.id);

      if (existRecipe !== -1) {
        if (confirm('Công thức trùng lặp! Bạn vẫn muốn thêm?')) {
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
      sourceArray = planItemData
        .filter((item) => compareTwoDates(item.plan?.date, planItemMove.from))
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

    if (!login.user || !login.user?.uid) {
      return;
    }

    if (!compareTwoDates(planItemMove.from, planItemMove.to)) {
      const sourceReq: PlanReq = {
        account_id: login.user.uid,
        date: formatDateToStringInDB(planItemMove.from),
        recipeIds: sourceArray.map((item) => item.recipe.id),
      };

      const destinationReq: PlanReq = {
        account_id: login.user.uid,
        date: formatDateToStringInDB(planItemMove.to),
        recipeIds: destinationArray.map((item) => item.recipe.id),
      };

      await Promise.all([
        PlanItemService.AddOrUpdateRecipesToPlan(sourceReq),
        PlanItemService.AddOrUpdateRecipesToPlan(destinationReq),
      ]);
    } else {
      const req: PlanReq = {
        account_id: login.user.uid,
        date: formatDateToStringInDB(planItemMove.from),
        recipeIds: sourceArray.map((item) => item.recipe.id),
      };
      await PlanItemService.AddOrUpdateRecipesToPlan(req);
    }
  };

  //#endregion

  const handleRemovePlanItem = async (
    date: Date,
    recipeId: number,
    order: number
  ) => {
    const planItemDelete = planItemData.find(
      (item) =>
        item.recipe.id === recipeId &&
        compareTwoDates(item.plan?.date, date) &&
        item.order === order
    );

    const newPlanItemData = planItemData
      .filter(
        (item) =>
          !(
            item.recipe.id === planItemDelete?.recipe_id &&
            compareTwoDates(item.plan?.date, planItemDelete?.plan.date) &&
            item.order === planItemDelete?.order
          )
      )
      .map((item) => {
        if (
          compareTwoDates(item.plan?.date, planItemDelete?.plan.date) &&
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
    const req: PlanDeleteReq = {
      account_id: planItemDelete?.plan.account_id,
      date: formatDateToStringInDB(planItemDelete?.plan.date),
      recipeId: planItemDelete?.recipe.id,
      order: planItemDelete?.order,
    };
    const result = await PlanItemService.DeletePlanItem(req);

    if (result) {
      snackbarAlert('Xóa công thức thành công', 'success');
    } else {
      snackbarAlert('Xóa thất bại', 'error');
    }
  };

  const AddPlanItem = async (item: Plan_ItemEntity) => {
    if (!login.user || !login.user?.uid) {
      return;
    }
    const remainArray = planItemData.filter(
      (planItem) => !compareTwoDates(planItem.plan?.date, item.plan?.date)
    );

    let array = planItemData.filter((planItem) =>
      compareTwoDates(planItem.plan?.date, item.plan?.date)
    );

    const exist = array.find(
      (planItem) => planItem.recipe_id === item.recipe_id
    );
    if (exist) {
      if (confirm('Công thức trùng lặp! Bạn vẫn muốn thêm?')) {
      } else {
        return;
      }
    }

    array = [...array, item].map((item, index) => {
      return {
        ...item,
        order: index + 1,
      };
    });

    setPlanItemData([...remainArray, ...array]);

    const req: PlanReq = {
      account_id: login.user.uid,
      date: formatDateToStringInDB(item.plan?.date),
      recipeIds: array.map((item) => item.recipe.id),
    };

    const result = await PlanItemService.AddOrUpdateRecipesToPlan(req);
    if (result) {
      snackbarAlert('Thêm công thức thành công', 'success');
    } else {
      snackbarAlert('Thêm công thức thất bại', 'error');
    }
  };

  const addAllToCart = async () => {
    if (!login.user || !login.user?.uid) {
      return;
    }

    const weeks: string[] = weekDates.map((item) =>
      item.date.toLocaleDateString('vi-VN')
    );

    const allRecipeids = planItemData
      .filter((item) => {
        return weeks.includes(item.plan?.date.toLocaleDateString('vi-VN'));
      })
      .map((item) => item.recipe_id);

    if (allRecipeids.length === 0) {
      snackbarAlert('Lịch ăn tuần chọn đang trống!', 'error');
      return;
    }

    try {
      handleSpinner(true);
      const recipeToCartReq: RecipeToCartReq = {
        account_id: login.user.uid,
        recipe_ids: allRecipeids,
      };
      const result = await CartItemService.AddRecipeToCart(recipeToCartReq);
      handleSpinner(false);

      if (result) {
        snackbarAlert('Thêm vào giỏ đi chợ thành công', 'success');
      } else {
        snackbarAlert('Thêm vào giỏ đi chợ thất bại', 'error');
      }
    } catch (error) {
      console.log(error);
      handleSpinner(false);
    }
  };

  return (
    <Layout headerPosition="static" isDynamicHeader={false}>
      {login.isUserSignedIn && (
        <>
          <Grid container alignItems={'stretch'} justifyContent={'center'}>
            <Grid item xs={12}>
              <Container
                sx={{
                  py: 3,
                }}
              >
                <Grid
                  sx={{ width: '100%' }}
                  container
                  justifyContent={'center'}
                  alignItems={'center'}
                  spacing={{
                    xs: 3,
                    md: 2,
                  }}
                >
                  <Grid item xs={12} md={4}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: '900',
                        textTransform: 'uppercase',
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
                        xs: 'none',
                        md: 'block',
                      },
                    }}
                  >
                    <WeekNavigation
                      weekCounter={weekCounter}
                      handleChangeWeekCounter={handleChangeWeekCounter}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <ActionSection
                      weekCounter={weekCounter}
                      handleChangeWeekCounter={(value: number) => {
                        setWeekCounter(value);
                      }}
                      addAllToCart={addAllToCart}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: {
                        xs: 'block',
                        md: 'none',
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
                  backgroundColor: 'secondary.main',
                  py: 4,
                }}
              >
                <Container>
                  <DragDropContext
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor: 'background.default',
                        border: 1,
                        borderColor: 'grey.300',
                      }}
                    >
                      <Grid
                        container
                        justifyContent={'flex-start'}
                        alignItems={'stretch'}
                      >
                        {weekDates.map((item, index) => (
                          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <WeekDateItem
                              isDragging={isDragging}
                              weekDates={item}
                              handleRemovePlanItem={handleRemovePlanItem}
                              AddPlanItem={AddPlanItem}
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
        </>
      )}
      {login.isUserSignedIn == false && (
        <>
          <h1>Lỗi đăng nhập</h1>
        </>
      )}
    </Layout>
  );
};

export default MealPlanner;
