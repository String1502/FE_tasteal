import { Typography } from "@mui/material";
import { FC } from "react";

export type RecipeTimeInfoItemProps = {
  time: number;
  type: "total" | "active";
};

const RecipeTimeInfoItem: FC<RecipeTimeInfoItemProps> = ({ time, type }) => {
  return (
    <>
      <Typography typography={"h6"} fontWeight={"bolder"}>
        {time} min
      </Typography>

      {type === "total" ? (
        <Typography color={"gray.main"} fontStyle={"italic"}>
          Total time
        </Typography>
      ) : (
        <Typography color={"gray.main"} fontStyle={"italic"}>
          Active time
        </Typography>
      )}
    </>
  );
};

export default RecipeTimeInfoItem;
