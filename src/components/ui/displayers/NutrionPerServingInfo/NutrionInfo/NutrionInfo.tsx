import { Stack, Typography } from "@mui/material";
import { FC } from "react";

// TODO: move this
export const NutrionType = {
  calories: "calories",
  fat: "fat",
  protein: "protein",
  carbs: "carbs",
} as const;

// TODO: move this
export type NutrionType = (typeof NutrionType)[keyof typeof NutrionType];

// TODO: move this
export type NutrionInfoProps = {
  type: NutrionType;
  value: number;
  withGrams?: boolean;
};

const NutrionInfo: FC<NutrionInfoProps> = ({
  type,
  value,
  withGrams = false,
}) => {
  return (
    <Stack alignItems={"center"}>
      <Typography
        textTransform={"uppercase"}
        typography={"caption"}
        color={"gray.main"}
        sx={{
          opacity: 0.5,
        }}
      >
        {type}
      </Typography>
      <Typography
        color="primary.main"
        typography={"body1"}
        fontWeight={"bold"}
      >{`${value} ${withGrams ? "g" : ""}`}</Typography>
    </Stack>
  );
};

export default NutrionInfo;
