import { DateDisplay } from "@/pages/MealPlanner";
import { recipes } from "@/types/sampleData";
import { RecipeEntity } from "@/types/type";
import { dateToDDMMYYYY } from "@/utils/format";
import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MealPlanCard } from "../cards/MealPlan/MealPlanCard";
import { AddRecipeButton } from "./AddRecipeButton";

const NoteTextField = () => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <TextField
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        variant="outlined"
        rows={isFocus ? 5 : 2}
        multiline
        color="primary"
        size="small"
        placeholder="Ghi chú"
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
        InputProps={{
          sx: {
            fontWeight: "regular",
            fontSize: "body2.fontSize",
            borderRadius: 3,
          },
        }}
        inputProps={{
          sx: {
            transition: "all 0.3s ease",
          },
        }}
      />
    </>
  );
};

function WeekDateItem({
  dateDisplay,
  date,
}: {
  dateDisplay: DateDisplay;
  date: Date;
}) {
  const [resultItem, setResultItem] = React.useState<RecipeEntity[]>(recipes);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 3,
          borderRight: dateDisplay.borderRight ? 1 : 0,
          borderBottom: dateDisplay.borderBottom ? 1 : 0,
          borderColor: "grey.300",
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "grey.600",
                lineHeight: 1,
              }}
              variant="body1"
              fontWeight={"bold"}
            >
              {dateDisplay.label}
            </Typography>
            <Typography
              variant="caption"
              fontWeight={"medium"}
              sx={{
                color: "grey.500",
                lineHeight: 0.5,
              }}
            >
              {dateToDDMMYYYY(date)}
            </Typography>
          </Box>

          <AddRecipeButton />
        </Box>

        <NoteTextField />

        {resultItem.length > 0 && (
          <MealPlanCard recipe={resultItem[0] as RecipeEntity} />
        )}
      </Box>
    </>
  );
}

export default WeekDateItem;
