import { Card, CardContent, Grid } from "@mui/material";
import { FC } from "react";
import RecipeTimeInfoItem from "./RecipeTimeInfoItem";

export type RecipeTimeInfoProps = {
  totalTime: number;
  activeTime?: number;
};

const RecipeTimeInfo: FC<RecipeTimeInfoProps> = ({ totalTime, activeTime }) => {
  return (
    <Card
      sx={{
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
        borderWidth: 2,
        borderRadius: 6,
        boxShadow: "none",
      }}
    >
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default RecipeTimeInfo;
