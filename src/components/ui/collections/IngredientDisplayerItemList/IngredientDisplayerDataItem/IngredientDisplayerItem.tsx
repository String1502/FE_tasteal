import { resolveImagePathAsync } from "@/lib/firebase/image";
import { MeasurementUnitResolver } from "@/lib/resolvers/measurement";
import { Box, Grid, Link, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import IngredientDisplayerItemProps from "../types/IngredientDisplayerItemProps";

const IngredientDisplayerItem: FC<IngredientDisplayerItemProps> = ({
  value: { Ingredient, amount },
}) => {
  const [resolvedUrl, setResolvedUrl] = useState("");

  useEffect(() => {
    async function resolveUrl(path: string) {
      try {
        const url = await resolveImagePathAsync(path);
        setResolvedUrl(url);
      } catch (error) {
        setResolvedUrl("");
      }
    }

    if (!Ingredient?.image) {
      setResolvedUrl("");
      return;
    }

    resolveUrl(Ingredient.image);
  }, [Ingredient?.image]);

  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={3}>
        <Box
          component={"img"}
          src={resolvedUrl}
          width={32}
          height={32}
          sx={{
            objectFit: "cover",
          }}
        ></Box>
      </Grid>
      <Grid item xs={6}>
        <Typography fontSize={12} color="primary.main">
          {`${amount} ${MeasurementUnitResolver(Ingredient?.isLiquid)}`}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Link href="" typography={"body1"} fontWeight={"bold"}>
          {Ingredient?.name ?? "N/A"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default IngredientDisplayerItem;
