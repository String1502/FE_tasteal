import { popoverPath } from "@/assets/exportImage";
import useFirebaseImage from "@/lib/hooks/useFirebaseImage";
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { DefaultTuKhoas, TuKhoa } from "../../../pages/Search";
import {
  ingredients as defaultIngredients,
  occasions as defaultOccasions,
} from "../../../lib/constants/sampleData";
import { CustomLink } from "./CustomLink";
import { IngredientEntity } from "@/lib/models/entities/IngredientEntity/IngredientEntity";
import { OccasionEntity } from "@/lib/models/entities/OccasionEntity/OccasionEntity";

const gridItemSX = {
  height: "100%",
  borderRight: 1.5,
  borderColor: "secondary.main",
  py: 2,
};

const limit = 5;

export function PopoverContent() {
  const [tuKhoas, setTuKhoas] = React.useState<TuKhoa[]>(DefaultTuKhoas);
  const [ingredients, setIngredients] =
    React.useState<IngredientEntity[]>(defaultIngredients);
  const [occasions, setOccasions] =
    React.useState<OccasionEntity[]>(defaultOccasions);
  const popoverPathImage = useFirebaseImage(popoverPath);
  return (
    <>
      <Container
        sx={{
          pt: 4,
          pb: 12,
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          alignSelf={"stretch"}
        >
          <Grid item xs={3}>
            <Box
              sx={{
                aspectRatio: "1/1",
                border: 1,
                borderColor: "secondary.main",
                backgroundImage: `url(${popoverPathImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: 2,
              }}
            ></Box>
          </Grid>

          <Grid item xs={3}>
            <Box sx={gridItemSX}>
              <Typography variant="h6" fontWeight={"bold"}>
                Hot Trend
              </Typography>
              {tuKhoas.slice(0, limit).map((item) => {
                return (
                  <CustomLink key={item.label} href={"#"} label={item.label} />
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box sx={gridItemSX}>
              <Typography variant="h6" fontWeight={"bold"}>
                Nguyên liệu
              </Typography>
              {ingredients.slice(0, limit).map((item) => {
                return (
                  <CustomLink key={item.id} href={"#"} label={item.name} />
                );
              })}
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box sx={{ ...gridItemSX, borderRight: 0 }}>
              <Typography variant="h6" fontWeight={"bold"}>
                Dịp
              </Typography>
              {occasions.slice(0, limit).map((item) => {
                return (
                  <CustomLink key={item.id} href={"#"} label={item.name} />
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
