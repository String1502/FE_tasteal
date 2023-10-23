import { resolveImagePathAsync } from "@/lib/firebase/image";
import { MeasurementUnitResolver } from "@/lib/resolvers/measurement";
import { Box, Grid, Link, Typography } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import IngredientDisplayerItemProps from "../types/IngredientDisplayerItemProps";

const IngredientDisplayerItem: FC<IngredientDisplayerItemProps> = ({
  value: { Ingredient, amount },
  servingSize,
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

  const ingredientAmount = useMemo(() => {
    return amount * (servingSize ?? 1);
  }, [amount, servingSize]);

  return (
    <Grid container alignItems={"center"}>
      <Grid item xs={2}>
        <Box
          component={"img"}
          src={resolvedUrl}
          width={40}
          height={40}
          sx={{
            objectFit: "cover",
            border: "2px solid",
            borderColor: "primary.main",
            borderRadius: "100%",
          }}
        ></Box>
      </Grid>
      <Grid item xs={2}>
        <Typography fontSize={12} color="primary.main">
          {`${ingredientAmount} ${MeasurementUnitResolver(
            Ingredient?.isLiquid
          )}`}
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Link
          href=""
          typography={"body1"}
          fontWeight={"bold"}
          textAlign={"left"}
        >
          {Ingredient?.name ?? "N/A"}
        </Link>
      </Grid>
    </Grid>
  );
};

export default IngredientDisplayerItem;
