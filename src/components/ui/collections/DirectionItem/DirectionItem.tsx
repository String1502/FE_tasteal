import { Recipe_DirectionEntity } from "@/lib/models/entities/Recipe_DirectionEntity/Recipe_DirectionEntity";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

type DirectionItemProps = {
  value: Recipe_DirectionEntity;
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
