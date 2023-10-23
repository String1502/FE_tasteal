import { Grid } from "@mui/material";
import { FC } from "react";
import SimpleContainer from "../../container/SimpleContainer";
import RecipeTimeInfoItem from "./RecipeTimeInfoItem";

export type RecipeTimeInfoProps = {
  totalTime: number;
  activeTime?: number;
};

const RecipeTimeInfo: FC<RecipeTimeInfoProps> = ({ totalTime, activeTime }) => {
  return (
    <SimpleContainer>
      <Grid container>
        <Grid item xs textAlign={"center"}>
          <RecipeTimeInfoItem time={totalTime} type="total" />
        </Grid>
        {activeTime && (
          <Grid item xs textAlign={"center"}>
            <RecipeTimeInfoItem time={activeTime} type="active" />
          </Grid>
        )}
      </Grid>
    </SimpleContainer>
  );
};

export default RecipeTimeInfo;
