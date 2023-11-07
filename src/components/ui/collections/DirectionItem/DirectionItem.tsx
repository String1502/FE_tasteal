import { Direction } from "@/lib/models/dtos/common";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type DirectionItemProps = {
  value: Omit<Direction, "recipe_id">;
};

const DirectionItem: FC<DirectionItemProps> = ({ value }) => {
  return (
    <Stack gap={2}>
      <Typography color="primary.main" fontSize={20} fontWeight={"bold"}>
        Step {value.step}
      </Typography>
      <Typography>{value.direction}</Typography>
    </Stack>
  );
};

export default DirectionItem;
